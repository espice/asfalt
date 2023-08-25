"use client";

import React, { useState } from "react";
import { Fira_Code } from "next/font/google";
import Input from "../components/Input";

const fira = Fira_Code({ subsets: ["latin"] });

export default function SpyLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
    </body>
  );
}
