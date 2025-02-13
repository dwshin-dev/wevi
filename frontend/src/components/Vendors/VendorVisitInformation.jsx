import React, { useEffect, useRef } from "react";

// ✅ 카카오 API 키 입력 (JavaScript 키)
const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY; // ✅ 환경 변수 사용

export default function VendorVisitInformation({ data }) {
  const mapContainer = useRef(null); // 지도를 표시할 DOM 요소 참조

  useEffect(() => {
    if (!data.autoRoadAddress) return;

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 📌 주소를 좌표로 변환
        geocoder.addressSearch(data.autoRoadAddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            const map = new window.kakao.maps.Map(mapContainer.current, {
              center: coords,
              level: 3, // 확대 수준
            });

            // 📌 마커 추가
            new window.kakao.maps.Marker({
              map,
              position: coords,
            });
          } else {
            console.error("주소 검색 실패:", data.autoRoadAddress);
          }
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [data.autoRoadAddress]);

  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">방문 안내</h3>
      <div ref={mapContainer} className="w-full h-64 rounded-lg mt-2"></div>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        <p className="font-bold">주소</p>
        <p className="col-span-2">{data.autoRoadAddress}</p>

        <p className="font-bold">지하철</p>
        <p className="col-span-2">{data.subway}</p>

        <p className="font-bold">주차</p>
        <div className="col-span-2">
          {data.parkinglot?.split(/, |\n/).map((info, index) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
