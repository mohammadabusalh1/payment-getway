import React from "react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      merchant: "Starbucks Coffee",
      category: "Food & Drink",
      amount: "-$4.85",
      date: "Today",
      icon: "☕",
      type: "debit",
    },
    {
      id: 2,
      merchant: "Salary Deposit",
      category: "Income",
      amount: "+$3,200.00",
      date: "Yesterday",
      icon: "💰",
      type: "credit",
    },
    {
      id: 3,
      merchant: "Amazon Purchase",
      category: "Shopping",
      amount: "-$89.99",
      date: "2 days ago",
      icon: "📦",
      type: "debit",
    },
    {
      id: 4,
      merchant: "Gas Station",
      category: "Transportation",
      amount: "-$45.20",
      date: "3 days ago",
      icon: "⛽",
      type: "debit",
    },
    {
      id: 5,
      merchant: "Netflix Subscription",
      category: "Entertainment",
      amount: "-$14.99",
      date: "5 days ago",
      icon: "🎬",
      type: "debit",
    },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Recent Transactions
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-muted/30 rounded-full">
                <span className="text-lg">{transaction.icon}</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {transaction.merchant}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {transaction.category}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-foreground"
                }`}
              >
                {transaction.amount}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
