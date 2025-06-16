"use client";
import React from "react";
import CountUp from "react-countup";

const GoalsProgress = () => {
  const goals = [
    {
      name: "Emergency Fund",
      target: 10000,
      current: 7500,
      icon: "🛡️",
      color: "bg-blue-500",
    },
    {
      name: "Vacation Trip",
      target: 3000,
      current: 1850,
      icon: "✈️",
      color: "bg-green-500",
    },
    {
      name: "New Car",
      target: 25000,
      current: 8200,
      icon: "🚗",
      color: "bg-purple-500",
    },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Financial Goals
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          Add Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progressPercentage = getProgressPercentage(
            goal.current,
            goal.target
          );

          return (
            <div
              key={index}
              className="p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{goal.icon}</span>
                  <span className="font-medium text-foreground">
                    {goal.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  <CountUp
                    start={0}
                    end={progressPercentage}
                    duration={2 + index * 0.3}
                    decimals={0}
                    suffix="%"
                    preserveValue
                  />
                </span>
              </div>

              <div className="mb-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${goal.color}`}
                    style={{
                      width: `${progressPercentage}%`,
                      transitionDelay: `${index * 300}ms`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  <CountUp
                    start={0}
                    end={goal.current}
                    duration={2.5 + index * 0.3}
                    decimals={0}
                    separator=","
                    prefix="$"
                    preserveValue
                  />{" "}
                  of{" "}
                  <CountUp
                    start={0}
                    end={goal.target}
                    duration={2 + index * 0.2}
                    decimals={0}
                    separator=","
                    prefix="$"
                    preserveValue
                  />
                </span>
                <span className="text-muted-foreground">
                  <CountUp
                    start={0}
                    end={goal.target - goal.current}
                    duration={1.8 + index * 0.2}
                    decimals={0}
                    separator=","
                    prefix="$"
                    preserveValue
                  />{" "}
                  to go
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
        <p className="text-sm text-primary font-medium">💡 Tip</p>
        <p className="text-xs text-primary/80 mt-1">
          Set up automatic transfers to reach your goals faster!
        </p>
      </div>
    </div>
  );
};

export default GoalsProgress;
