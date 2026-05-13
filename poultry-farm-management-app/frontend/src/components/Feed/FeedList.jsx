// src/components/Feed/FeedList.jsx

import React from "react";

const FeedList = ({ feeds, onEdit, onDelete }) => {

  if (!feeds.length) {
    return <p>No feed formulas found.</p>;
  }

  // 🔥 FEED COST CALCULATOR
  const calculateFeedCost = (feed) => {

    const maize =
      (feed.maizePercent * feed.maizePrice) / 100;

    const soya =
      (feed.soyaPercent * feed.soyaPrice) / 100;

    const dorb =
      (feed.dorbPercent * feed.dorbPrice) / 100;

    const marble =
      (feed.marblePercent * feed.marblePrice) / 100;

    const premix =
      (feed.premixPercent * feed.premixPrice) / 100;

    return (
      maize +
      soya +
      dorb +
      marble +
      premix
    ).toFixed(2);
  };

  // 🔥 TOTAL PERCENTAGE
  const calculateTotalPercent = (feed) => {

    return (
      Number(feed.maizePercent || 0) +
      Number(feed.soyaPercent || 0) +
      Number(feed.dorbPercent || 0) +
      Number(feed.marblePercent || 0) +
      Number(feed.premixPercent || 0)
    );
  };

  return (

    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
      }}
    >

      <thead>

        <tr style={{ background: "#f3f4f6" }}>

          <th>ID</th>

          <th>Formula Name</th>

          <th>Maize %</th>
          <th>Maize Price</th>

          <th>Soya %</th>
          <th>Soya Price</th>

          <th>DORB %</th>
          <th>DORB Price</th>

          <th>Marble %</th>
          <th>Marble Price</th>

          <th>Premix %</th>
          <th>Premix Price</th>

          {/* 🔥 NEW */}
          <th>Total %</th>

          {/* 🔥 NEW */}
          <th>Feed Cost / KG</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {feeds.map((feed) => {

          const totalPercent =
            calculateTotalPercent(feed);

          return (

            <tr key={feed.id}>

              <td>{feed.id}</td>

              <td>{feed.formulaName}</td>

              <td>{feed.maizePercent}</td>
              <td>₹ {feed.maizePrice}</td>

              <td>{feed.soyaPercent}</td>
              <td>₹ {feed.soyaPrice}</td>

              <td>{feed.dorbPercent}</td>
              <td>₹ {feed.dorbPrice}</td>

              <td>{feed.marblePercent}</td>
              <td>₹ {feed.marblePrice}</td>

              <td>{feed.premixPercent}</td>
              <td>₹ {feed.premixPrice}</td>

              {/* 🔥 TOTAL % */}
              <td
                style={{
                  color:
                    totalPercent === 100
                      ? "green"
                      : "red",
                  fontWeight: "bold"
                }}
              >
                {totalPercent}%
              </td>

              {/* 🔥 FEED COST */}
              <td
                style={{
                  fontWeight: "bold",
                  color: "#2563eb"
                }}
              >
                ₹ {calculateFeedCost(feed)}
              </td>

              <td>

                <button
                  onClick={() => onEdit(feed)}
                  style={{
                    marginRight: "8px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(feed.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          );
        })}

      </tbody>

    </table>
  );
};

export default FeedList;