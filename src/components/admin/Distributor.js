import React, { useEffect, useState } from "react";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import moment from "moment";
import CustomToPagination from "../../Shared/Pagination";
import { Edit } from "lucide-react";

// MUI imports for Dialog
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CustomTable from "./Shared/CustomTable";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import toast from "react-hot-toast";
const Distributor = () => {
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
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

  const { data, isLoading, error, refetch } = useQuery(
    ["get_distributor_details", pagination, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_distributor_details}?page=${pagination}&count=10&search=${search}`
      ),
    usequeryBoolean,
    { keepPreviousData: true }
  );

  const distributors = data?.data?.result || [];

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
      }),
    usequeryBoolean,
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
  }, [
    downlineSearch,
    downlinePage,
    downlineStartDate,
    downlineEndDate,
    isDistributorDownline,
    openDownline,
  ]);

  // Debounce refetch for upline search
  useEffect(() => {
    if (!openUpline) return;
    const delay = setTimeout(() => {
      refetchUpline();
    }, 500);
    return () => clearTimeout(delay);
  }, [
    uplineSearch,
    uplinePage,
    uplineStartDate,
    uplineEndDate,
    isDistributorUpline,
    openUpline,
  ]);

  async function handleRank(id, rank) {
    setLoading(true);
    try {
      const res = await apiConnectorPost(endpoint?.assign_direct_rank, {
        m_id: id,
        rank: rank,
      });
      if (res.data?.success) {
        refetch();
      }
      toast(res.data?.message, { id: 1 });
    } catch (e) {
      toast(e?.message, { id: 1 });
    }
    setLoading(false);
  }
  const tablehead = [
    <span>S.No.</span>,
    <span>Unique ID</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>Phone No.</span>,
    <span>Current Level</span>,
    <span>Direct Members</span>,
    <span>Team Members</span>,
    <span>Team Business</span>,
    <span>Spon ID</span>,
    <span>Spon. Name</span>,
    <span>Wallet </span>,
    <span>E-Gold </span>,
    <span>Distributor Reg Date</span>,
    <span>Level Details</span>,
    <span>Downline</span>,
    <span>Upline</span>,
  ];

  const tablerow = distributors?.data?.map((d, idx) => [
    <span>{(pagination - 1) * 10 + (idx + 1)}</span>,
    <span>{d.mlm_unique_id}</span>,
    <span>{d.name}</span>,
    <span>{d.cl_email}</span>,
    <span>{d.cl_phone}</span>,
    <span className="flex items-center justify-between">
      {d.mlm_curr_level}
      <IconButton>
        <Add
          size={14}
          onClick={() =>
            handleRank(d.mlm_id, Number(d.mlm_curr_level || 0) + 1)
          }
        />
      </IconButton>
    </span>,
    <span>{d.mlm_direct_mem}</span>,
    <span>{d.mlm_team_mem}</span>,
    <span>{d.mlm_team_buss}</span>,
    <span>{d.spon_customer_id}</span>,
    <span>{d.spon_name}</span>,
    <span>{d.mlm_income_wallet}</span>,
    <span>{d.gold_wallet}</span>,
    <span>
      {d.mlm_dist_reg_date
        ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
        : "-"}
    </span>,
    <span>
      {d.level_details
        ? `Level ${d.level_details.l_level_id} / Commission: ${d.level_details.l_commission} / Team Business Goal: ${d.level_details.l_team_buss}`
        : "-"}
    </span>,
    <span className=" cursor-pointer text-blue-600 hover:text-blue-800">
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
    </span>,
    <span className=" border-b cursor-pointer text-blue-600 hover:text-blue-800">
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
    </span>,
  ]);

  const tableheaddown = [
    <span>S.No</span>,
    <span>Unique ID</span>,
    <span>Level No.</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>Phone</span>,
    <span>Self Invest</span>,
    <span>Purchase Wallet</span>,
    <span>Direct Business</span>,
    <span>Sponsor Email</span>,
    <span>Sponsor Phone</span>,
    <span>Sponsor Name</span>,
    <span>Direct Members</span>,
    <span>Team Members</span>,
    <span>Team Business</span>,
    <span>Reg. Date</span>,
  ];

  const tablerowdown = downlineData?.data?.result?.data?.map((d, index) => [
    <span>{(downlinePage - 1) * 10 + (index + 1)}</span>,

    <span>{d.mlm_unique_id}</span>,
    <span>{d.level_id}</span>,

    <span>{d.name}</span>,
    <span>{d.cl_email}</span>,
    <span>{d.cl_phone}</span>,
    <span>{d.mlm_self_invest}</span>,
    <span>{d.purchase_wallet}</span>,
    <span>{d.mlm_direct_buss}</span>,
    <span>{d.spon_email}</span>,
    <span>{d.spon_phone}</span>,
    <span>{d.spon_name}</span>,
    <span>{d.mlm_direct_mem}</span>,
    <span>{d.mlm_team_mem}</span>,
    <span>{d.mlm_team_buss}</span>,
    <span>
      {d.mlm_dist_reg_date
        ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
        : "--"}
    </span>,
  ]);

  const tableheadUpline = [
    <span>S.No</span>,
    <span>Unique ID</span>,
    <span>Level No.</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>Phone</span>,
    <span>Self Invest</span>,
    <span>Purchase Wallet</span>,
    <span>Direct Business</span>,
    <span>Sponsor Email</span>,
    <span>Sponsor Phone</span>,
    <span>Sponsor Name</span>,
    <span>Direct Members</span>,
    <span>Team Members</span>,
    <span>Team Business</span>,
    <span>Reg. Date</span>,
  ];

  const tablerowUpline = uplineData?.data?.result?.data?.map((d, index) => [
    <span>{(uplinePage - 1) * 10 + (index + 1)}</span>,
    <span>{d.mlm_unique_id}</span>,
    <span>{d.level_id}</span>,
    <span>{d.name}</span>,
    <span>{d.cl_email}</span>,
    <span>{d.cl_phone}</span>,
    <span>{d.mlm_self_invest}</span>,
    <span>{d.purchase_wallet}</span>,
    <span>{d.mlm_direct_buss}</span>,
    <span>{d.spon_email}</span>,
    <span>{d.spon_phone}</span>,
    <span>{d.spon_name}</span>,
    <span>{d.mlm_direct_mem}</span>,
    <span>{d.mlm_team_mem}</span>,
    <span>{d.mlm_team_buss}</span>,
    <span>
      {d.mlm_dist_reg_date
        ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
        : "--"}
    </span>,
  ]);

  return (
    <div className="p-6 ">
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
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
        />
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={isLoading || loading}
      />

      {/* Pagination Component */}
      <div className="mt-4">
        <CustomToPagination
          data={distributors}
          page={pagination}
          setPage={setPagination}
        />
      </div>

      {/* Downline Modal */}
      <Dialog
        open={openDownline}
        onClose={() => setOpenDownline(false)}
        maxWidth="lg"
        fullWidth
      >
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

          <CustomTable
            tablehead={tableheaddown}
            tablerow={tablerowdown}
            isLoading={isLoadingDownline}
          />

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
      <Dialog
        open={openUpline}
        onClose={() => setOpenUpline(false)}
        maxWidth="lg"
        fullWidth
      >
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
          <CustomTable
            tablehead={tableheadUpline}
            tablerow={tablerowUpline}
            isLoading={isLoadingUpline}
          />
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
