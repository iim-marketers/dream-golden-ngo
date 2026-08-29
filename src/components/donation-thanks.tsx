"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";

const DONATED_PARAM = "donated";
const REDIRECTION_TIME_PARAM = "redirection_time";

let arrivedFromDonation: boolean | null = null;

function subscribe() {
  return () => {};
}

function getSnapshot() {
  arrivedFromDonation ??=
    new URLSearchParams(window.location.search).get(DONATED_PARAM) === "1";
  return arrivedFromDonation;
}

export function DonationThanks() {
  const donated = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [dismissed, setDismissed] = useState(false);

  const open = donated && !dismissed;

  useEffect(() => {
    const url = new URL(window.location.href);
    if (
      !url.searchParams.has(DONATED_PARAM) &&
      !url.searchParams.has(REDIRECTION_TIME_PARAM)
    ) {
      return;
    }

    url.searchParams.delete(DONATED_PARAM);
    url.searchParams.delete(REDIRECTION_TIME_PARAM);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setDismissed(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-green-950/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs" />

        <Dialog.Popup className="fixed inset-0 z-50 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-3xl bg-cream-50 p-6 text-center shadow-xl transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-8">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-coral-200 text-coral-700">
            <HeartIcon className="size-6" />
          </span>

          <Dialog.Title className="mt-5 font-heading text-2xl font-bold text-green-900">
            Thank you for giving.
          </Dialog.Title>

          <Dialog.Description className="mt-3 text-sm leading-relaxed text-green-900/70">
            Your donation goes straight to education, doorstep healthcare, food
            and animal rescue across rural West Medinipur. We will email your
            receipt shortly.
          </Dialog.Description>

          <Dialog.Close
            render={
              <Button className="mt-7 h-11 w-full rounded-full bg-coral-600 font-semibold text-cream-50 hover:bg-coral-500" />
            }
          >
            Continue
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
