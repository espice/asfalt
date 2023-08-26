"use client";

import React, { useEffect, useState } from "react";
import { Fira_Code } from "next/font/google";
import Input from "../components/Input";
import MatrixBackground from "../components/MatrixBackground";

const fira = Fira_Code({ subsets: ["latin"] });

export default function SpyLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showMatrix, setShowMatrix] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowMatrix(false);
    }, 3000);
  }, []);

  return (
    <body className={fira.className}>
      <div className="bg-black h-screen w-screen flex items-center justify-center text-[#20C20E]">
        <div className="w-1/3">
          <p className="pb-[14px]">Welcome to DADA-CON agent.</p>
          <Input value={id} onChange={setId} placeholder={"Agent ID"} />
          <Input
            value={password}
            onChange={setPassword}
            placeholder={"Password"}
            type="password"
          />
        </div>
      </div>
      {showMatrix && <MatrixBackground timeout={50} />}
    </body>
  );
}
