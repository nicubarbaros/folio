# Analytics

The production site loads Google Analytics 4 from `pages/_document.tsx`. The measurement id comes from `GA_TRACKING_ID` at build time. The public id in use is `G-LM06B10M7C`.

A production build with `window.gtag` present sends events. `next dev` sends nothing. A missing tag returns without an exception.

## Page views

The first view of a URL is the `page_view` from the gtag config in the document. The path is `window.location.pathname`.

A client-side route change sends `page_view` for the next path. `pages/_app.tsx` listens to `routeChangeComplete` and calls `pageView`. The same path as the document that just loaded is left as the one view from the document tag. A later visit to that path sends `page_view` again.

## Okie events

`/okie` sends the events below. Other pages keep the older `submit_form` call on the roadmap.

### okie_download_click

A click on Download for Mac sends this when the link is a `.dmg` or `.zip` file. `transport_type` is `beacon`, so the hit can leave with the download.

| Param          | Example                | Meaning                                              |
| -------------- | ---------------------- | ---------------------------------------------------- |
| location       | `hero`, `download`     | `hero` is the intro. `download` is the closing band. |
| version        | `1.0.0`                | Taken from the file name.                            |
| file_name      | `Okie-1.0.0-arm64.dmg` | File name in the URL.                                |
| file_extension | `dmg`                  | Extension of that file.                              |
| link_url       | GitHub release URL     | The href.                                            |
| transport_type | `beacon`               | Sent with `navigator.sendBeacon`.                    |

The `#download` anchor is only a scroll target. It does not send this event.

### okie_buy_license_click

A click on Buy license sends this. The link opens the Lemon Squeezy checkout. `transport_type` is `beacon`.

| Param          | Example            |
| -------------- | ------------------ |
| location       | `hero`, `download` |
| currency       | `USD`              |
| value          | `39`               |
| link_url       | checkout URL       |
| transport_type | `beacon`           |

### begin_checkout

The same Buy license click also sends `begin_checkout`. This is the GA4 recommended checkout event. It carries the same location, currency, value, link, and beacon transport, plus one item.

| Param | Value                                                                          |
| ----- | ------------------------------------------------------------------------------ |
| items | `item_id` `okie-license`, `item_name` `Okie license`, `price` 39, `quantity` 1 |

### okie_section_view

A section sends this once per page view, when it enters the top 80% of the window.

| Param        | Values                                                    |
| ------------ | --------------------------------------------------------- |
| section_name | `hero`, `product`, `problem`, `how`, `download`, `footer` |

`hero` is the intro. `product` is the review screenshot. `problem` is the problem paragraph. `how` is "How a review works". `download` is the closing band. `footer` is the footer.

### okie_scroll_depth

The page sends this at 25%, 50%, 75%, and 100% of its height. Each value is sent once per page view.

| Param            | Values                  |
| ---------------- | ----------------------- |
| percent_scrolled | `25`, `50`, `75`, `100` |

Enhanced measurement already records one `scroll` event at 90%. `okie_scroll_depth` is the four-step depth for this page. A page that fits in the window reports 100% on load.

### okie_how_step_select

A click on a step in "How a review works" sends this. The hover state and the autoplay timer leave the event alone.

| Param       | Example                                                             |
| ----------- | ------------------------------------------------------------------- |
| step_id     | `inbox`, `workflows`, `brief`, `guided`, `approve`                  |
| step_number | `1` through `5`                                                     |
| step_name   | `Inbox`, `Workflows`, `Brief`, `Guided review`, `Approve on GitHub` |

### okie_outbound_click

The footer GitHub profile sends this. `transport_type` is `beacon`.

| Param          | Example                           |
| -------------- | --------------------------------- |
| location       | `footer`                          |
| link_url       | `https://github.com/nicubarbaros` |
| link_domain    | `github.com`                      |
| outbound       | `true`                            |
| transport_type | `beacon`                          |

The download file and the checkout have their own events. A link back to nicubarbaros.com stays on the site.

Enhanced measurement can also record a generic `click` for the GitHub profile. Use `okie_outbound_click` for the Okie report.

## Key events

Open Admin, then Data display, then Events. Mark these two as Key events:

- `okie_download_click`
- `okie_buy_license_click`

`begin_checkout` stays a normal event. It holds the $39 value for a monetization exploration. The Key event for the buy click is `okie_buy_license_click`.

## Where the numbers show up

Open Reports, then Engagement, then Events. The names above show up there after production traffic arrives.

## Funnel

Open Explore, then Funnel exploration. Add three steps:

1. Name the step `Visit /okie`. Choose `page_view`. Filter page path to an exact match on `/okie`.
2. Name the step `Download`. Choose `okie_download_click`.
3. Name the step `Buy license`. Choose `okie_buy_license_click`.

A closed funnel keeps people who did the steps in that order. The download event count can sit above the user count, because the page has two Download buttons.
