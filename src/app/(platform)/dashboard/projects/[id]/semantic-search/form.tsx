"use client";

import { Card, CardBody, CardFooter, Input, Spinner } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import { semanticSearchAction } from "./action";

export const FormSemanticSearch = () => {
  const params = useParams();
  const [state, formAction, pending] = useActionState(semanticSearchAction, null);
  console.log(state?.data);

  return (
    <main className="space-y-6">
      <form action={formAction}>
        <input type="hidden" name="projectId" value={params.id} />
        <Input name="query" placeholder="Search something on document" variant="bordered" />
      </form>
      <div className="space-y-6">
        {!pending &&
          state?.data &&
          state.data.document?.map((doc, i) => {
            return (
              <Card key={i}>
                <CardBody>
                  <div>{doc}</div>
                </CardBody>
                <CardFooter className="font-semibold">Embedding Distance : {state.data?.distance[i]}</CardFooter>
              </Card>
            );
          })}
        {pending && (
          <div className="flex gap-2 items-center justify-center">
            <Spinner size="sm" />
            Searching...
          </div>
        )}
      </div>
    </main>
  );
};
