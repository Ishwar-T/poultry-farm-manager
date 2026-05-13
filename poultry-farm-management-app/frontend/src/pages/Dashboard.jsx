import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const Dashboard = () => {

  const [totalExpense, setTotalExpense] = useState(0);

  const [totalSales, setTotalSales] = useState(0);

  const [profit, setProfit] = useState(0);

  const [totalBirds, setTotalBirds] = useState(0);

  const [totalMortality, setTotalMortality] = useState(0);

  const [mortalityPercent, setMortalityPercent] = useState(0);

  // 🔥 NEW
  const [batchAnalytics, setBatchAnalytics] = useState([]);

  // 🔥 CHART COLORS
    const COLORS = [
      "#2563eb",
      "#16a34a",
      "#dc2626",
      "#f59e0b",
      "#9333ea"
    ];

  const fetchData = async () => {

    try {

      const [
        expRes,
        salesRes,
        dailyRes,
        batchRes
      ] = await Promise.all([

        axios.get("http://localhost:8080/api/expenses"),

        axios.get("http://localhost:8080/api/sales"),

        axios.get("http://localhost:8080/api/daily-records"),

        axios.get("http://localhost:8080/api/batches")
      ]);

      const expenses = expRes.data || [];

      const sales = salesRes.data || [];

      const batches = batchRes.data || [];

      // =========================
      // OVERALL TOTALS
      // =========================

      const expenseSum = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
      );

      const salesSum = sales.reduce(
        (sum, s) => sum + Number(s.totalAmount || 0),
        0
      );

      const birdsSum = batches.reduce(
        (sum, b) => sum + Number(b.totalBirds || 0),
        0
      );

      const mortalitySum = (dailyRes.data || []).reduce(
        (sum, r) => sum + Number(r.mortality || 0),
        0
      );

      const mortalityPct = birdsSum > 0
        ? ((mortalitySum / birdsSum) * 100).toFixed(2)
        : 0;

      setTotalExpense(expenseSum);

      setTotalSales(salesSum);

      setProfit(salesSum - expenseSum);

      setTotalBirds(birdsSum);

      setTotalMortality(mortalitySum);

      setMortalityPercent(mortalityPct);

      // =========================
      // 🔥 BATCH ANALYTICS
      // =========================

      const analytics = batches.map((batch) => {


        // BATCH EXPENSES
        const batchExpense = expenses
          .filter(
            (e) =>
              Number(e.batchId) === Number(batch.id)
          )
          .reduce(
            (sum, e) =>
              sum + Number(e.amount || 0),
            0
          );

        // BATCH SALES
        const batchSales = sales
          .filter(
            (s) =>
              Number(s.batchId) === Number(batch.id)
          )
          .reduce(
            (sum, s) =>
              sum + Number(s.totalAmount || 0),
            0
          );

        // PROFIT
        const batchProfit =
          batchSales - batchExpense;

        return {
          id: batch.id,

          name:
            batch.name ||
            `Batch ${batch.id}`,

          expense: batchExpense,

          sales: batchSales,

          profit: batchProfit
        };
      });

      setBatchAnalytics(analytics);

    } catch (err) {

      console.error("Dashboard error", err);
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  // 🔥 PDF EXPORT
  const downloadPDF = () => {

      const doc = new jsPDF();

      // TITLE
      doc.setFontSize(20);

      doc.text(
        "Poultry Farm Report",
        14,
        20
      );

      // SUMMARY
      doc.setFontSize(12);

      doc.text(
        `Total Expense: ₹ ${totalExpense}`,
        14,
        40
      );

      doc.text(
        `Total Sales: ₹ ${totalSales}`,
        14,
        50
      );

      doc.text(
        `Profit/Loss: ₹ ${profit}`,
        14,
        60
      );

      doc.text(
        `Mortality %: ${mortalityPercent}%`,
        14,
        70
      );

      // 🔥 TABLE
      autoTable(doc, {

        startY: 90,

        head: [[
          "Batch",
          "Expense",
          "Sales",
          "Profit"
        ]],

        body: batchAnalytics.map((b) => [

          b.name,

          `₹ ${b.expense}`,

          `₹ ${b.sales}`,

          `₹ ${b.profit}`
        ])
      });

      // SAVE PDF
      doc.save("poultry-report.pdf");
    };

  const cardStyle = {
    flex: 1,
    background: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  return (

    <div>

      <h2>Dashboard</h2>

      <button
        onClick={downloadPDF}
        style={{
          padding: "10px 18px",
          border: "none",
          borderRadius: "8px",
          background: "#16a34a",
          color: "white",
          cursor: "pointer",
          marginTop: "10px",
          marginBottom: "20px",
          fontWeight: "bold"
        }}
      >
        📄 Download PDF Report
      </button>

      {/* 🔥 TOP CARDS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
          flexWrap: "wrap"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Expense</h3>
          <p>₹ {totalExpense}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Sales</h3>
          <p>₹ {totalSales}</p>
        </div>

        <div style={cardStyle}>
          <h3>Profit</h3>

          <p
            style={{
              color:
                profit >= 0
                  ? "green"
                  : "red"
            }}
          >
            ₹ {profit}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Total Birds</h3>
          <p>{totalBirds}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Mortality</h3>
          <p>{totalMortality}</p>
        </div>

        <div style={cardStyle}>
          <h3>Mortality %</h3>

          <p style={{ color: "red" }}>
            {mortalityPercent}%
          </p>
        </div>

      </div>

      {/* 🔥 BATCH ANALYTICS */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >

        <h3>
          Batch-wise Profit Analytics
        </h3>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#f3f4f6"
              }}
            >

              <th style={thStyle}>
                Batch
              </th>

              <th style={thStyle}>
                Expense
              </th>

              <th style={thStyle}>
                Sales
              </th>

              <th style={thStyle}>
                Profit / Loss
              </th>

            </tr>

          </thead>

          <tbody>

            {batchAnalytics.map((b) => (

              <tr key={b.id}>

                <td style={tdStyle}>
                  {b.name}
                </td>

                <td style={tdStyle}>
                  ₹ {b.expense}
                </td>

                <td style={tdStyle}>
                  ₹ {b.sales}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color:
                      b.profit >= 0
                        ? "green"
                        : "red",
                    fontWeight: "bold"
                  }}
                >
                  ₹ {b.profit}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* 🔥 CHARTS SECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "40px"
          }}
        >

          {/* 🔥 BAR CHART */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >

            <h3>Batch Profit Chart</h3>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={batchAnalytics}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="profit"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* 🔥 PIE CHART */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >

            <h3>Expense Distribution</h3>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={[
                    {
                      name: "Expenses",
                      value: totalExpense
                    },
                    {
                      name: "Profit",
                      value:
                        profit > 0
                          ? profit
                          : 0
                    }
                  ]}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {COLORS.map(
                    (color, index) => (

                      <Cell
                        key={index}
                        fill={color}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
};

// 🔥 STYLES

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

export default Dashboard;