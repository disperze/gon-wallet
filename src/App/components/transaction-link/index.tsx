import * as React from "react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ellideMiddle } from "../../services";

interface TransactionLinkProps {
  readonly tx: string;
  readonly maxLength?: number | null;
}

export function TransactionLink({ tx, maxLength = 20 }: TransactionLinkProps): JSX.Element {
  return (
    <Link
      href={`https://gon.ping.pub/iris/tx/${tx}`}
      isExternal>
        {ellideMiddle(tx, maxLength || 999)} <ExternalLinkIcon mx="2px" />
    </Link>
  );
}
