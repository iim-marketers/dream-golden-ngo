"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";

const DONATED_PARAM = "donated";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getSnapshot() {
  return new URLSearchParams(window.location.search).get(DONATED_PARAM) === "1";
}

export function DonationThanks() {
  const arrivedFromDonation = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);

  const open = arrivedFromDonation && !dismissed;

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) return;
    setDismissed(true);

    const url = new URL(window.location.href);
    url.searchParams.delete(DONATED_PARAM);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-green-950/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs" />
        {/* Centred with inset-0 + m-auto rather than left-1/2 + translate:
            100vw counts the scrollbar, which pushed the box off-centre and
            clipped it on narrow screens. max-h with overflow keeps it usable
            on short viewports, such as a phone held in landscape. */}
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
