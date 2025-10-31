import React from "react";
import { complaints } from "../../../utils/mockData";
import Button from "../../../components/ui/Buttons/Button";
import { Link } from "react-router-dom";
function UserComplaints() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">My Complaints</h2>
        <Link to={"/complaint"}>
          <Button variant="primary" size="sm">
            New Complaint
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Medicine
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Manufacturer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Store
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {complaint.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {complaint.medicineName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {complaint.manufacturer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                    {complaint.store}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-primary">
                    {/* <Link
                      to={`/dashboard/complaints/${complaint.id}`}
                      className="text-[#156874] hover:underline"
                    > */}
                    View
                    {/* </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserComplaints;
