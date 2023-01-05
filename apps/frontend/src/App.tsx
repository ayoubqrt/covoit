import { type FC, useEffect } from "react";
import { initClient } from "@ts-rest/core";
import { contract } from "@api/contract";

const client = initClient(contract, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {},
});

export const App: FC = () => {
  useEffect(() => {
    client.hello().then((res) => {
      console.log(res);
    });
  }, []);

  return <div>eeeee</div>;
};
