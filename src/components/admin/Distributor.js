import React, { useEffect, useState } from "react";
import { apiConnectorGet, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import moment from "moment";
import CustomToPagination from "../../Shared/Pagination";
import { Edit } from "lucide-react";

// MUI imports for Dialog
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Distributor = () => {
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch distributor data
  const { data, isLoading, error } = useQuery(
    ["get_distributor_details", pagination, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_distributor_details}?page=${pagination}&count=10&search=${search}`
      ),
    usequeryBoolean,
    { keepPreviousData: true }
  );

  const distributors = data?.data?.result || [];

  // States for Downline modal
  const [openDownline, setOpenDownline] = useState(false);
  const [downlineCustId, setDownlineCustId] = useState(null);
  const [downlineSearch, setDownlineSearch] = useState("");
  const [downlinePage, setDownlinePage] = useState(1);
  const [downlineStartDate, setDownlineStartDate] = useState("");
  const [downlineEndDate, setDownlineEndDate] = useState("");
  const [isDistributorDownline, setIsDistributorDownline] = useState(1);

  // States for Upline modal
  const [openUpline, setOpenUpline] = useState(false);
  const [uplineCustId, setUplineCustId] = useState(null);
  const [uplineSearch, setUplineSearch] = useState("");
  const [uplinePage, setUplinePage] = useState(1);
  const [uplineStartDate, setUplineStartDate] = useState("");
  const [uplineEndDate, setUplineEndDate] = useState("");
  const [isDistributorUpline, setIsDistributorUpline] = useState(1);

  // Fetch downline data
  const {
    data: downlineData,
    isLoading: isLoadingDownline,
    refetch: refetchDownline,
  } = useQuery(
    [
      "direct_distributors_downline",
      downlineCustId,
      isDistributorDownline,
      downlinePage,
      downlineSearch,
      downlineStartDate,
      downlineEndDate,
    ],
    () =>
      apiConnectorGet(endpoint.get_team_admin, {
        cust_id: downlineCustId,
        search: downlineSearch,
        start_date: downlineStartDate,
        end_date: downlineEndDate,
        level_id: 0,
        is_distributer: isDistributorDownline,
        page: downlinePage,
        count: 10,
      }), usequeryBoolean,
    {
      enabled: !!openDownline && !!downlineCustId,
      keepPreviousData: true,
    }
  );

  // Fetch upline data
  const {
    data: uplineData,
    isLoading: isLoadingUpline,
    refetch: refetchUpline,
  } = useQuery(
    [
      "upline_team",
      uplineCustId,
      isDistributorUpline,
      uplinePage,
      uplineSearch,
      uplineStartDate,
      uplineEndDate,
    ],
    () =>
      apiConnectorGet(endpoint.get_upline_team_admin, {
        cust_id: uplineCustId,
        search: uplineSearch,
        start_date: uplineStartDate,
        end_date: uplineEndDate,
        level_id: 0,
        is_distributer: isDistributorUpline,
        page: uplinePage,
        count: 10,
      }),
      usequeryBoolean,
    {
      enabled: !!openUpline && !!uplineCustId,
      keepPreviousData: true,
    }
  );

  // Debounce refetch for downline search
  useEffect(() => {
    if (!openDownline) return;
    const delay = setTimeout(() => {
      refetchDownline();
    }, 500);
    return () => clearTimeout(delay);
  }, [downlineSearch, downlinePage, downlineStartDate, downlineEndDate, isDistributorDownline, openDownline]);

  // Debounce refetch for upline search
  useEffect(() => {
    if (!openUpline) return;
    const delay = setTimeout(() => {
      refetchUpline();
    }, 500);
    return () => clearTimeout(delay);
  }, [uplineSearch, uplinePage, uplineStartDate, uplineEndDate, isDistributorUpline, openUpline]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading distributors</div>;
  }

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Distributor Details</h1>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination(1); // reset page on search
          }}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="overflow-auto rounded border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Unique ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone No.</th>
              <th className="px-4 py-2 border-b">Current Level</th>
              <th className="px-4 py-2 border-b">Direct Members</th>
              <th className="px-4 py-2 border-b">Team Members</th>
              <th className="px-4 py-2 border-b">Team Business</th>
              <th className="px-4 py-2 border-b">Spon ID</th>
              <th className="px-4 py-2 border-b">Spon. Name</th>
              <th className="px-4 py-2 border-b">Wallet </th>
              <th className="px-4 py-2 border-b">E-Gold </th>
              <th className="px-4 py-2 border-b">Distributor Reg Date</th>
              <th className="px-4 py-2 border-b">Level Details</th>
              <th className="px-4 py-2 border-b">Downline</th>
              <th className="px-4 py-2 border-b">Upline</th>
            </tr>
          </thead>

          <tbody>
            {distributors?.length?.data=== 0 ? (
              <tr>
                <td colSpan="16" className="text-center py-4 text-gray-500">
                  No distributors found.
                </td>
              </tr>
            ) : (
              distributors?.data?.map((d) => (
                <tr key={d.mlm_id}>
                  <td className="px-4 py-2 border-b">{d.mlm_unique_id}</td>
                  <td className="px-4 py-2 border-b">{d.name}</td>
                  <td className="px-4 py-2 border-b">{d.cl_email}</td>
                  <td className="px-4 py-2 border-b">{d.cl_phone}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_curr_level}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_direct_mem}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_team_mem}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_team_buss}</td>
                  <td className="px-4 py-2 border-b">{d.spon_customer_id}</td>
                  <td className="px-4 py-2 border-b">{d.spon_name}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_income_wallet}</td>
                  <td className="px-4 py-2 border-b">{d.gold_wallet}</td>
                  <td className="px-4 py-2 border-b">
                    {d.mlm_dist_reg_date
                      ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {d.level_details
                      ? `Level ${d.level_details.l_level_id} / Commission: ${d.level_details.l_commission} / Team Business Goal: ${d.level_details.l_team_buss}`
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border-b cursor-pointer text-blue-600 hover:text-blue-800">
                    <Edit
                      onClick={() => {
                        setDownlineCustId(d.mlm_id);
                        setOpenDownline(true);
                        setDownlineSearch("");
                        setDownlinePage(1);
                        setDownlineStartDate("");
                        setDownlineEndDate("");
                        setIsDistributorDownline(1);
                      }}
                    />
                  </td>
                  <td className="px-4 py-2 border-b cursor-pointer text-blue-600 hover:text-blue-800">
                    <Edit
                      onClick={() => {
                        setUplineCustId(d.mlm_id);
                        setOpenUpline(true);
                        setUplineSearch("");
                        setUplinePage(1);
                        setUplineStartDate("");
                        setUplineEndDate("");
                        setIsDistributorUpline(1);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <div className="mt-4">
        <CustomToPagination
          data={distributors}
          page={pagination}
          setPage={setPagination}
        />
      </div>

      {/* Downline Modal */}
      <Dialog open={openDownline} onClose={() => setOpenDownline(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Downline Members</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <TextField
              label="Search by username"
              variant="outlined"
              size="small"
              value={downlineSearch}
              onChange={(e) => setDownlineSearch(e.target.value)}
              fullWidth
            />
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              size="small"
              value={downlineStartDate}
              onChange={(e) => setDownlineStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              value={downlineEndDate}
              onChange={(e) => setDownlineEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Button
              variant={isDistributorDownline === 1 ? "contained" : "outlined"}
              onClick={() => setIsDistributorDownline(1)}
            >
              Distributor
            </Button>
            <Button
              variant={isDistributorDownline === 0 ? "contained" : "outlined"}
              onClick={() => setIsDistributorDownline(0)}
            >
              Customer
            </Button>
          </div>

          {isLoadingDownline ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-yellow-100 text-left">
                  <tr>
                    <th className="px-4 py-2 border-b">S.No</th>
                    <th className="px-4 py-2 border-b">Unique ID</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Phone</th>
                    <th className="px-4 py-2 border-b">Self Invest</th>
                    <th className="px-4 py-2 border-b">Purchase Wallet</th>
                    <th className="px-4 py-2 border-b">Direct Business</th>
                    <th className="px-4 py-2 border-b">Sponsor Email</th>
                    <th className="px-4 py-2 border-b">Sponsor Phone</th>
                    <th className="px-4 py-2 border-b">Sponsor Name</th>
                    <th className="px-4 py-2 border-b">Direct Members</th>
                    <th className="px-4 py-2 border-b">Team Members</th>
                    <th className="px-4 py-2 border-b">Team Business</th>
                    <th className="px-4 py-2 border-b">Reg. Date</th>
                  </tr>
                </thead>
                <tbody>
                  {downlineData?.data?.result?.data?.map((d, index) => (
                    <tr key={d.mlm_id}>
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_unique_id}</td>
                      <td className="px-4 py-2 border-b">{d.name}</td>
                      <td className="px-4 py-2 border-b">{d.cl_email}</td>
                      <td className="px-4 py-2 border-b">{d.cl_phone}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_self_invest}</td>
                      <td className="px-4 py-2 border-b">{d.purchase_wallet}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_direct_buss}</td>
                      <td className="px-4 py-2 border-b">{d.spon_email}</td>
                      <td className="px-4 py-2 border-b">{d.spon_phone}</td>
                      <td className="px-4 py-2 border-b">{d.spon_name}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_direct_mem}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_team_mem}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_team_buss}</td>
                      <td className="px-4 py-2 border-b">
                        {d.mlm_dist_reg_date
                          ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
                          : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <CustomToPagination
            data={downlineData?.data?.result}
            page={downlinePage}
            setPage={setDownlinePage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDownline(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Upline Modal */}
      <Dialog open={openUpline} onClose={() => setOpenUpline(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Upline Members</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <TextField
              label="Search by username"
              variant="outlined"
              size="small"
              value={uplineSearch}
              onChange={(e) => setUplineSearch(e.target.value)}
              fullWidth
            />
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              size="small"
              value={uplineStartDate}
              onChange={(e) => setUplineStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              value={uplineEndDate}
              onChange={(e) => setUplineEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Button
              variant={isDistributorUpline === 1 ? "contained" : "outlined"}
              onClick={() => setIsDistributorUpline(1)}
            >
              Distributor
            </Button>
            <Button
              variant={isDistributorUpline === 0 ? "contained" : "outlined"}
              onClick={() => setIsDistributorUpline(0)}
            >
              Customer
            </Button>
          </div>

          {isLoadingUpline ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-green-100 text-left">
                  <tr>
                    <th className="px-4 py-2 border-b">S.No</th>
                    <th className="px-4 py-2 border-b">Unique ID</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Phone</th>
                    <th className="px-4 py-2 border-b">Self Invest</th>
                    <th className="px-4 py-2 border-b">Purchase Wallet</th>
                    <th className="px-4 py-2 border-b">Direct Business</th>
                    <th className="px-4 py-2 border-b">Sponsor Email</th>
                    <th className="px-4 py-2 border-b">Sponsor Phone</th>
                    <th className="px-4 py-2 border-b">Sponsor Name</th>
                    <th className="px-4 py-2 border-b">Direct Members</th>
                    <th className="px-4 py-2 border-b">Team Members</th>
                    <th className="px-4 py-2 border-b">Team Business</th>
                    <th className="px-4 py-2 border-b">Reg. Date</th>
                  </tr>
                </thead>
                <tbody>
                  {uplineData?.data?.result?.data?.map((d, index) => (
                    <tr key={d.mlm_id}>
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_unique_id}</td>
                      <td className="px-4 py-2 border-b">{d.name}</td>
                      <td className="px-4 py-2 border-b">{d.cl_email}</td>
                      <td className="px-4 py-2 border-b">{d.cl_phone}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_self_invest}</td>
                      <td className="px-4 py-2 border-b">{d.purchase_wallet}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_direct_buss}</td>
                      <td className="px-4 py-2 border-b">{d.spon_email}</td>
                      <td className="px-4 py-2 border-b">{d.spon_phone}</td>
                      <td className="px-4 py-2 border-b">{d.spon_name}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_direct_mem}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_team_mem}</td>
                      <td className="px-4 py-2 border-b">{d.mlm_team_buss}</td>
                      <td className="px-4 py-2 border-b">
                        {d.mlm_dist_reg_date
                          ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
                          : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <CustomToPagination
            data={uplineData?.data?.result}
            page={uplinePage}
            setPage={setUplinePage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpline(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Distributor;
