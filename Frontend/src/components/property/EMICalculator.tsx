import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

/* ─── Types ─────────────────────────────────────────── */

interface EMICalculatorProps {
  propertyPrice?: number;
}

/* ─── Helpers ───────────────────────────────────────── */

function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatINRShort(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(0)} L`;
  return n.toLocaleString("en-IN");
}

function calculateEMI(principal: number, annualRate: number, years: number) {
  if (principal <= 0 || annualRate <= 0 || years <= 0)
    return { emi: 0, totalInterest: 0, totalPayment: 0 };

  const r = annualRate / 100 / 12; // monthly rate
  const n = years * 12; // total months

  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const rn = Math.pow(1 + r, n);
  const emi = (principal * r * rn) / (rn - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

/* ─── Component ─────────────────────────────────────── */

const EMICalculator: React.FC<EMICalculatorProps> = ({
  propertyPrice = 5000000,
}) => {
  const [price, setPrice] = useState(propertyPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const downPayment = Math.round((price * downPaymentPct) / 100);
  const loanAmount = price - downPayment;

  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEMI(loanAmount, interestRate, tenure),
    [loanAmount, interestRate, tenure],
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#122d4d] to-[#0f2847] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-[#C9A227]" />
          EMI Calculator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Property Price */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#94a3b8]">
              Property Price
            </label>
            <span className="text-sm font-semibold text-[#C9A227]">
              {formatINR(price)}
            </span>
          </div>
          <Slider
            min={500000}
            max={100000000}
            step={500000}
            value={[price]}
            onValueChange={(v) => setPrice(v[0])}
            aria-label="Property price"
          />
          <div className="flex justify-between text-xs text-[#7a8fa6]">
            <span>₹5 L</span>
            <span>₹10 Cr</span>
          </div>
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#94a3b8]">
              Down Payment
            </label>
            <span className="text-sm font-semibold text-[#fafafa]">
              {downPaymentPct}% ({formatINR(downPayment)})
            </span>
          </div>
          <Slider
            min={10}
            max={50}
            step={1}
            value={[downPaymentPct]}
            onValueChange={(v) => setDownPaymentPct(v[0])}
            aria-label="Down payment percentage"
          />
          <div className="flex justify-between text-xs text-[#7a8fa6]">
            <span>10%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#94a3b8]">
              Loan Tenure
            </label>
            <span className="text-sm font-semibold text-[#fafafa]">
              {tenure} years
            </span>
          </div>
          <Slider
            min={5}
            max={30}
            step={1}
            value={[tenure]}
            onValueChange={(v) => setTenure(v[0])}
            aria-label="Loan tenure in years"
          />
          <div className="flex justify-between text-xs text-[#7a8fa6]">
            <span>5 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#94a3b8]">
              Interest Rate
            </label>
            <span className="text-sm font-semibold text-[#fafafa]">
              {interestRate}%
            </span>
          </div>
          <Slider
            min={6}
            max={15}
            step={0.1}
            value={[interestRate]}
            onValueChange={(v) => setInterestRate(parseFloat(v[0].toFixed(1)))}
            aria-label="Annual interest rate"
          />
          <div className="flex justify-between text-xs text-[#7a8fa6]">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#1a3a5c]" />

        {/* Results */}
        <motion.div
          key={`${loanAmount}-${tenure}-${interestRate}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* EMI highlight */}
          <div className="rounded-xl border border-[#C9A227]/30 bg-gradient-to-r from-[#C9A227]/10 to-[#C9A227]/5 p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
              Monthly EMI
            </p>
            <p className="mt-1 flex items-center justify-center gap-1 text-3xl font-extrabold text-[#C9A227]">
              <IndianRupee className="h-6 w-6" />
              {emi.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-[#122d4d] p-3 text-center">
              <p className="text-xs text-[#7a8fa6]">Loan Amount</p>
              <p className="mt-1 text-sm font-semibold text-[#fafafa]">
                {formatINRShort(loanAmount)}
              </p>
            </div>
            <div className="rounded-lg bg-[#122d4d] p-3 text-center">
              <p className="text-xs text-[#7a8fa6]">Total Interest</p>
              <p className="mt-1 text-sm font-semibold text-red-400">
                {formatINRShort(totalInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-[#122d4d] p-3 text-center">
              <p className="text-xs text-[#7a8fa6]">Total Payment</p>
              <p className="mt-1 text-sm font-semibold text-[#fafafa]">
                {formatINRShort(totalPayment)}
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EMICalculator;
