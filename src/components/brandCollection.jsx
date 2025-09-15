import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { handleScroll } from '../utils/scroll';

const SonasutraCollections = () => {
  const navigate = useNavigate();
  const { data } = useQuery(
    ["collection_get"],
    () => apiConnectorGet(endpoint.get_collection),
    usequeryBoolean
  );

  const collections = data?.data?.result || [];


  return (
    <div className="w-full bg-yellow-50 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-1xl md:text-3xl font-semibold text-black mb-2">
          Sonasutra Collections
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {collections.map((item) => {
            return (
              <div
                key={item.coll_id}
                className="group cursor-pointer"
                onClick={() => navigate(`/products_web?collection=${item?.coll_id}`)} >
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={item?.coll_image}
                    alt={item.name}
                    className="w-full h-auto object-contain bg-white"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${item.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="hidden md:block">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max px-2">
              {collections?.map((item) => {
                return (
                  <div
                    key={item.coll_id}
                    className="flex-shrink-0 w-80 lg:w-96 group cursor-pointer"
                    onClick={() => navigate(`/products_web?collection=${item?.coll_id}`)}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img
                        src={item?.coll_image}
                        alt={item.name}
                        className="w-full h-auto object-contain bg-white"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${item.name}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8" onClick={() => handleScroll("viewcollection_scroll")}>
          <button className="bg-yellow-800 hover:bg-yellow-900 text-white text-sm font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SonasutraCollections;
