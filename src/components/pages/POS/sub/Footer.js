import moment from "moment";

export default function POSFooterExcel({ formik }) {
  const handleChange = (e, field) => {
    formik.setFieldValue(field, e.target.value);
  };
  const cellInput =
    "w-[90px] h-[20px] border border-gray-300 text-right bg-white text-[10px] px-2 focus:outline-none focus:ring-0";

  const totalQnty =
    formik?.values.rows?.reduce((a, b) => a + Number(b?.pc || 0), 0) || 0;
  const totalFine =
    formik?.values.rows?.reduce((a, b) => a + Number(b?.fine || 0), 0) || 0;
  const totalTotal =
    formik?.values.rows?.reduce((a, b) => a + Number(b?.total || 0), 0) || 0;
  const totalReceipt = Number(
    formik?.values?.receipt?.reduce(
      (a, b) => a + Number(b?.amount || 0),
      0 || 0
    ) || 0
  );
  const totalPayment = Number(
    formik?.values?.payment?.reduce(
      (a, b) => a + Number(b?.amount || 0),
      0 || 0
    ) || 0
  );

  const netBalance =
    totalTotal -
    totalReceipt +
    totalPayment +
    Number(formik?.values?.add_extra_amount || 0) -
    Number(formik?.values?.less_extra_amount || 0) +
    Number(formik.values.pb_closing_bal || 0);
  return (
    <div className="bg-[#fbcfe8] border border-gray-400  text-[10px] rounded-sm max-w-[55%] !flex !flex-col !items-end ">
      {/* --- Top Section --- */}
      <div className="flex flex-col gap-[.5px] mb-0.5">
        {/* Total Sale */}
        <div className="flex">
          <div className="w-[90px] bg-[#fff2cc] font-semibold border border-gray-400 flex items-center justify-center">
            Total Sale
          </div>
          <input
            type="text"
            readOnly
            className={cellInput}
            value={totalQnty.toFixed(0)}
          />
          <input
            type="text"
            readOnly
            className={cellInput}
            value={totalFine.toFixed(3)}
          />
          <input
            type="text"
            readOnly
            className={cellInput}
            value={totalTotal.toFixed(2)}
          />
        </div>

        {/* Return */}
        <div className="flex">
          <div className="w-[90px] bg-[#fff2cc] font-semibold border border-gray-400 flex items-center justify-center">
            Return
          </div>
          {[...Array(3)].map((_, i) => (
            <input
              key={i}
              type="text"
              className={cellInput}
              value={formik.values[`return_${i}`] || ""}
              onChange={(e) => handleChange(e, `return_${i}`)}
            />
          ))}
        </div>

        {/* Last Bal. */}
        <div className="flex">
          <div className="w-[90px] bg-[#fff2cc] font-semibold border border-gray-400 flex items-center justify-center">
            Last Bal.
          </div>
          <input
            type="text"
            className={`${cellInput} w-[180px]`}
            value={
              Number(formik.values.pb_closing_bal || 0) > 0
                ? moment
                    .utc(formik.values.pb_billing_date)
                    ?.format("YYYY-MM-DD HH:mm:ss")
                : "--"
            }
          />
          {/* <input
            type="text"
            className={`${cellInput} w-[270px]`}
            // value={formik.values.lastBal || ""}
            // onChange={(e) => handleChange(e, "lastBal")}
          /> */}
          <input
            type="text"
            className={`${cellInput}`}
            value={Number(formik.values.pb_closing_bal || 0)}
          />
        </div>
      </div>

      {/* --- Middle Section --- */}
      <div className="flex flex-col gap-[.5px] mb-0.5 !h-[80px] overflow-auto ">
        <div className="flex">
          <div className="w-[90px] bg-white font-semibold border border-gray-400 flex items-center justify-center">
            ADD
          </div>
          {["1", "2", "3", "4", "add_extra_amount"].map((key, i) => (
            <input
              key={i}
              type="text"
              className={cellInput}
              value={formik.values[`${key}`] || ""}
              onChange={(e) => handleChange(e, `${key}`)}
            />
          ))}
        </div>
        <div className="flex">
          <div className="w-[90px] bg-white font-semibold border border-gray-400 flex items-center justify-center">
            LESS
          </div>
          {["1", "2", "3", "4", "less_extra_amount"].map((key, i) => (
            <input
              key={i}
              type="text"
              className={cellInput}
              value={formik.values[`${key}`] || ""}
              onChange={(e) => handleChange(e, `${key}`)}
            />
          ))}
        </div>
        <div className="flex">
          <div className="w-[90px] bg-white font-semibold border border-gray-400 flex items-center justify-center">
            RATE DIFF
          </div>
          {["1", "2", "3", "4", "rate_diff_extra_amount"].map((key, i) => (
            <input
              key={i}
              type="text"
              className={cellInput}
              value={formik.values[`${key}`] || ""}
              onChange={(e) => handleChange(e, `${key}`)}
            />
          ))}
        </div>
        <div className="flex">
          <div className="w-[90px] bg-white font-semibold border border-gray-400 flex items-center justify-center">
            ROUND OFF
          </div>
          {["1", "2", "3", "4", "round_off_extra_amount"].map((key, i) => (
            <input
              key={i}
              type="text"
              className={cellInput}
              value={formik.values[`${key}`] || ""}
              onChange={(e) => handleChange(e, `${key}`)}
            />
          ))}
        </div>
        {formik?.values?.receipt?.map((label, i) => (
          <div key={label} className="flex">
            <div className="w-[90px] bg-white font-semibold border border-gray-400 flex items-center justify-center">
              RECEIPT
            </div>
            <input
              key={i}
              type="text"
              className={cellInput}
              value={label?.paymentType}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={Number(label?.rate)?.toFixed(0) || 0}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={Number(label?.batch)?.toFixed(0) || 0}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={Number(label?.tunch)?.toFixed(0) || 0}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={`-${Number(label?.amount || 0)?.toFixed(0) || 0}`}
            />
          </div>
        ))}
        {formik?.values?.payment?.map((label, i) => (
          <div key={label} className="flex">
            <div className="w-[90px] bg-white font-semibold border border-gray-400 flex items-center justify-center">
              PAYMENT
            </div>
            <input
              key={i}
              type="text"
              className={cellInput}
              value={label?.paymentType}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={Number(label?.rate)?.toFixed(0) || 0}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={Number(label?.batch)?.toFixed(0) || 0}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={Number(label?.tunch)?.toFixed(0) || 0}
            />
            <input
              key={i}
              type="text"
              className={cellInput}
              value={`+${Number(label?.amount || 0)?.toFixed(0) || 0}`}
            />
          </div>
        ))}
      </div>

      {/* --- Bottom Section --- */}
      <div className="flex flex-col gap-[.5px] mb-0.5">
        {/* Adjustments */}
        <div className="flex">
          <div className="w-[90px] font-semibold  flex items-center justify-center"></div>
          <input
            type="text"
            className={`${cellInput} text-red-500`}
            value={totalFine?.toFixed(2)}
          />
          <input
            type="text"
            className={cellInput}
            // value={formik.values[`adjustments_${i}`] || ""}
          />
          <input
            type="text"
            className={cellInput}
            // value={formik.values[`adjustments_${i}`] || ""}
          />
        </div>
        <div className="flex">
          <div className="w-[90px] bg-[#fff2cc] font-semibold border border-gray-400 flex items-center justify-center">
            Adjustments
          </div>
          {[...Array(3)].map((_, i) => (
            <input
              key={i}
              type="text"
              className={cellInput}
              value={formik.values[`adjustments_${i}`] || ""}
              onChange={(e) => handleChange(e, `adjustments_${i}`)}
            />
          ))}
        </div>

        {/* Net Balance */}
        <div className="flex">
          <div className="w-[90px] bg-[#fff2cc] font-semibold border border-gray-400 flex items-center justify-center">
            Net Balance
          </div>
          <input
            type="text"
            className={`${cellInput} text-red-500`}
            value={totalFine.toFixed(3)}
          />
          <input
            type="text"
            className={cellInput}
            // value={formik.values[`netBalance_${i}`] || ""}
          />
          <input
            type="text"
            className={cellInput}
            value={netBalance?.toFixed(3)}
          />
        </div>
      </div>

      {/* --- Nil Row --- */}
      <div className="flex text-center text-gray-600 text-[10px]">
        <div className="w-[90px] border border-gray-400 flex items-center justify-center">
          Nil
        </div>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-[90px] border border-gray-400 flex items-center justify-center"
          >
            Nil
          </div>
        ))}
      </div>
    </div>
  );
}
