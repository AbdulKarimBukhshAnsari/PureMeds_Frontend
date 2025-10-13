import React from 'react'
import { Check, AlertCircle } from 'lucide-react'

const SupplyChainTimeline = ({ data }) => {
  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-2">Supply Chain Verification</h3>
      <p className="text-gray-700 mb-6">
        <span className="font-medium">{data.medicineName}</span> | Batch:{' '}
        <span className="font-mono">{data.batchId}</span>
      </p>

      <div className="space-y-6">
        {data.events.map((event, index) => (
          <div key={index} className="flex">
            {/* Timeline Icon */}
            <div className="flex flex-col items-center mr-4">
              <div
                className={`rounded-full p-2 ${
                  event.verified ?? true
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {event.verified ?? true ? (
                  <Check size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              {index < data.events.length - 1 && (
                <div className="h-full w-0.5 bg-gray-300 my-1" />
              )}
            </div>

            {/* Event Details */}
            <div className="pb-6">
              <h4 className="font-medium text-lg">{event.stage}</h4>
              <p className="text-gray-600 mt-1">By: {event.actor}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(event.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <p>
          Manufacturer: <span className="font-medium">{data.manufacturer}</span>
        </p>
        <p>
          Production Date: {new Date(data.productionDate).toLocaleDateString()}
        </p>
        <p>
          Expiry Date: {new Date(data.expiryDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default SupplyChainTimeline
