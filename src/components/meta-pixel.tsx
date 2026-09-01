import Script from "next/script";

import { site } from "@/lib/site";

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${site.metaPixelId}');
(function(){
  /* crypto.randomUUID needs a secure context, which rules it out on plain-HTTP
     previews served from a LAN address. The fallback only has to be unique
     enough to pair one browser event with one server event. */
  var eid = (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : String(Date.now()) + '-' + Math.random().toString(36).slice(2);

  fbq('track', 'PageView', {}, { eventID: eid });

  /* Fire-and-forget: analytics must never surface an error to the visitor.
     keepalive lets the request outlive a fast bounce off the page. */
  fetch('/api/meta/conversions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'PageView',
      eventId: eid,
      eventSourceUrl: location.href
    }),
    keepalive: true
  }).catch(function(){});
})();
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${site.metaPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
