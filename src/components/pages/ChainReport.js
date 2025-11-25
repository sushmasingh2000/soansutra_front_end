import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";

const ChainReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const reportRef = useRef(null);

  const { data, isLoading, refetch } = useQuery(["chain_report"], () =>
    apiConnectorGet(endpoint?.get_chain_report, {
      search: searchTerm,
      page: 1,
      count: 10000,
    })
  );

  const reports = data?.data?.result || [];
  const token = localStorage.getItem("token");

  const { data: profile } = useQuery(
    ["profile"],
    () => apiConnectorGet(endpoint?.get_customer_profile),
    {
      ...usequeryBoolean,
      enabled: !!token,
    }
  );

  const profileData = profile?.data?.result || [];
  console.log(profileData);

  useEffect(() => {
    const t = setTimeout(() => refetch(), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const n = (v) => Number(v || 0);

  const ranks = [...Array(10)].map((_, i) => i + 1);

  const grouped = {};
  ranks.forEach((r) => {
    grouped[r] = reports.filter((it) => Number(it.mlm_curr_level) === r);
  });

  const subtotal = (list) => ({
    dir_gold_wallet: list.reduce((s, i) => s + n(i.dir_gold_wallet), 0),
    dir_gold_wallet_amount: list.reduce(
      (s, i) => s + n(i.dir_gold_wallet_amount),
      0
    ),

    team_gold_wallet: list.reduce((s, i) => s + n(i.team_gold_wallet), 0),
    team_gold_wallet_amount: list.reduce(
      (s, i) => s + n(i.team_gold_wallet_amount),
      0
    ),

    dazzle12_paid_amount_dir: list.reduce(
      (s, i) => s + n(i.dazzle12_paid_amount_dir),
      0
    ),
    dazzle12_paid_amount_team: list.reduce(
      (s, i) => s + n(i.dazzle12_paid_amount_team),
      0
    ),

    dazzle12_paid_amount_fresh_dir: list.reduce(
      (s, i) => s + n(i.dazzle12_paid_amount_fresh_dir),
      0
    ),
    dazzle12_paid_amount_fresh_team: list.reduce(
      (s, i) => s + n(i.dazzle12_paid_amount_fresh_team),
      0
    ),
  });

  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const w = pdf.internal.pageSize.getWidth() - 20;
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 10, 10, w, h);
    pdf.save("ChainReport.pdf");
  };
  const handlePrint = () => {
    if (!reportRef.current) return;

    const printContent = reportRef.current.innerHTML;
    const printWindow = window.open("", "", "width=1200,height=800");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Report</title>
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                font-family: Arial, Helvetica, sans-serif;
              }
              table, th, td {
                border: 1px solid #000;
                border-collapse: collapse;
              }
              th, td {
                padding: 4px;
                font-size: 12px;
                text-align: center;
              }
            }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chain Report</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* REPORT */}
      <div ref={reportRef} className="bg-white p-6 mt-4 border">
        {/* ---- STATIC HEADER EXACTLY LIKE YOUR PDF ---- */}
        <div className="text-center font-bold text-lg">
          SONASUTRA PRIVATE LIMITED
        </div>
        <div className="text-center text-sm">
          Shop No 10, Bhadohi Bypass,Rajpura Bida Mart Bhadohi Uttar Pradesh
        </div>

        <div className="mt-2 border-t border-black" />

        <div className="text-center font-semibold mt-1">
          Distributor Self+Chain Business{" "}
          <span className="!font-extrabold">{profileData?.name}</span>{" "}
          MemberCode-
          <span className="!font-extrabold">{profileData?.cust_unique_id}</span>
        </div>

        {/* <div className="flex justify-center gap-6 mt-1 text-sm">
          <div>From : 01-04-2025</div>
          <div>To : 30-04-2025</div>
        </div> */}

        <div className="border-t border-black pt-5" />

        {/* TABLE */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-black text-xs">
            {/* YOUR ORIGINAL HEADERS */}
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">S.No</th>
                <th className="border px-2 py-1">Cust ID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Sponsor ID</th>
                <th className="border px-2 py-1">Sponsor</th>
                <th className="border px-2 py-1">Current Rank</th>

                <th className="border px-2 py-1">Direct Gold Wallet</th>
                <th className="border px-2 py-1">Direct Gold Amount</th>

                <th className="border px-2 py-1">Team Gold Wallet</th>
                <th className="border px-2 py-1">Team Gold Amount</th>

                <th className="border px-2 py-1">Dazzle12 Dir</th>
                <th className="border px-2 py-1">Dazzle12 Team</th>
                <th className="border px-2 py-1">Dazzle12 Fresh Dir</th>
                <th className="border px-2 py-1">Dazzle12 Fresh Team</th>
              </tr>
            </thead>

            <tbody>
              {/* RANKWISE PRINT */}
              {ranks?.map((rank) => {
                const list = grouped[rank];
                const sub = subtotal(list);

                return (
                  <React.Fragment key={rank}>
                    {list.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-2">{index + 1}</td>
                        <td className="border px-2">{item?.mlm_unique_id}</td>
                        <td className="border px-2">{item?.cust_name}</td>
                        <td className="border px-2">{item?.spon_unique_id}</td>
                        <td className="border px-2">{item?.spon_cust_name}</td>
                        <td className="border px-2">{item?.mlm_curr_level}</td>

                        <td className="border px-2">
                          {n(item.dir_gold_wallet).toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {n(item.dir_gold_wallet_amount).toFixed(2)}
                        </td>

                        <td className="border px-2">
                          {n(item.team_gold_wallet).toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {n(item.team_gold_wallet_amount).toFixed(2)}
                        </td>

                        <td className="border px-2">
                          {n(item.dazzle12_paid_amount_dir).toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {n(item.dazzle12_paid_amount_team).toFixed(2)}
                        </td>

                        <td className="border px-2">
                          {n(item.dazzle12_paid_amount_fresh_dir).toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {n(item.dazzle12_paid_amount_fresh_team).toFixed(2)}
                        </td>
                      </tr>
                    ))}

                    {/* --- SUBTOTAL ROW --- */}
                    {list.length > 0 && (
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border px-2" colSpan={2}>
                          Total For Rank : {rank}
                        </td>
                        <td className="border px-2">{list.length} Members</td>
                        <td className="border px-2" colSpan={2}></td>

                        <td className="border px-2"></td>

                        <td className="border px-2">
                          {sub.dir_gold_wallet.toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {sub.dir_gold_wallet_amount.toFixed(2)}
                        </td>

                        <td className="border px-2">
                          {sub.team_gold_wallet.toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {sub.team_gold_wallet_amount.toFixed(2)}
                        </td>

                        <td className="border px-2">
                          {sub.dazzle12_paid_amount_dir.toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {sub.dazzle12_paid_amount_team.toFixed(2)}
                        </td>

                        <td className="border px-2">
                          {sub.dazzle12_paid_amount_fresh_dir.toFixed(2)}
                        </td>
                        <td className="border px-2">
                          {sub.dazzle12_paid_amount_fresh_team.toFixed(2)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChainReport;
