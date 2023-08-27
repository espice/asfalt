"use client";

import React, { useState } from "react";
import { Fira_Code } from "next/font/google";
import Input from "../../components/Input";
import MatrixBackground from "../../components/MatrixBackground";
import Button from "../../components/Button";
import { axios } from "@/utils/axios";
import { useRouter } from "next/navigation";

const fira = Fira_Code({ subsets: ["latin"] });

export default function SpyLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <body className={fira.className}>
      <div className="bg-black z-[-1] h-screen w-screen flex items-center justify-center text-[#20C20E]">
        <div className="w-1/3 z-10">
          <p className="pb-[14px]">Welcome to DADA-CON agent.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!loading) {
                setLoading(true);
                setError("");
                const res = await axios.post("/auth/spies/login", {
                  id,
                  password,
                });

                const { success } = res.data;

                if (!success) {
                  setError("Invalid ID or Password");
                  setLoading(false);
                } else {
                  setError("");
                  setLoading(false);
                  router.replace("/dada/con/");
                }
              }
            }}
          >
            <Input value={id} onChange={setId} placeholder={"Agent ID"} />
            <Input
              value={password}
              onChange={setPassword}
              placeholder={"Password"}
              type="password"
            />
            {error}
            <Button className="ml-[calc(100%)] translate-x-[-100%]">
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </div>
        {<MatrixBackground timeout={50} zIndex={1} opacity={0.25} />}
      </div>
    </body>
  );
}
