import * as React from "react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ellideMiddle } from "../../services";

interface TransactionLinkProps {
  readonly tx: string;
  readonly maxLength?: number | null;
  readonly explorerUrl?: string | null;
}

export function TransactionLink({ tx, explorerUrl = "https://gon.ping.pub/iris/tx", maxLength = 20 }: TransactionLinkProps): JSX.Element {
  return (
    <Link
      href={`${explorerUrl}/${tx}`}
      isExternal>
        {ellideMiddle(tx, maxLength || 999)} <ExternalLinkIcon mx="2px" />
    </Link>
  );
}
