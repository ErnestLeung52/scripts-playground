(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // 1) Root wrappers (based on your stable structure)
  const root = document.querySelector('.aHU.hx');
  if (!root) {
    console.log('❌ Cannot find .aHU.hx');
    return;
  }

  const list = root.querySelector('div[role="list"]');
  if (!list) {
    console.log('❌ Cannot find div[role="list"] inside .aHU.hx');
    return;
  }

  const items = Array.from(list.querySelectorAll('div[role="listitem"]'));
  console.log(`✅ Found ${items.length} emails (listitems)`);

  // 2) Extractors (recipient, code, amount)
  const extractRecipient = (item) => {
    // Best signal from your HTML:
    // <span class="hb">to <span email="gina...@gmail.com" ...></span></span>
    const node =
      item.querySelector('span.hb span[email]') ||
      item.querySelector('span.hb [email]') ||
      item.querySelector('span.hb span.g2[email]');

    const email = node?.getAttribute('email')?.trim()?.toLowerCase();
    if (email && email.includes('@')) return email;

    // Fallback: search nearby text "to xxx@yyy"
    const t = (item.innerText || '').replace(/\s+/g, ' ');
    const m = t.match(/\bto\s+([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i);
    return m ? m[1].toLowerCase() : '❌';
  };

  const extractCode = (text) => {
    // Prefer the explicit line first
    let m = text.match(/Enter the redemption code[:\s]+([A-Z0-9]{12})/i);
    if (m?.[1]) return m[1].trim();

    // Your email also shows "Reward Code" with a standalone 12-char code in a box
    // So fallback to first 12-char token
    m = text.match(/\b([A-Z0-9]{12})\b/);
    return m?.[1] ? m[1].trim() : '❌';
  };

  const extractAmount = (text) => {
    // In your example it’s right under the title: "$4.01"
    // Grab the first $ amount in the email
    const m = text.match(/(\$[0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)/);
    return m?.[1] ? m[1] : '❌';
  };

  // 3) Get the body text for one listitem (robust-ish)
  const getBodyText = (item) => {
    // Prefer the actual message body container if present
    const body =
      item.querySelector('.ii.gt') ||          // common body wrapper
      item.querySelector('.a3s') ||            // common body content
      item.querySelector('div[dir="ltr"]') ||  // sometimes body text containers
      item;

    return (body.innerText || '').trim();
  };

  // 4) Expand helper: if collapsed, click the listitem to expand
  const ensureExpanded = async (item) => {
    const expanded = item.getAttribute('aria-expanded');
    if (expanded === 'true') return;

    // Click the listitem itself (your HTML shows jsaction on the listitem)
    item.scrollIntoView({ block: 'center' });
    item.click();

    // Wait until aria-expanded flips OR body becomes non-trivial
    for (let i = 0; i < 25; i++) {
      await sleep(120);
      if (item.getAttribute('aria-expanded') === 'true') return;

      const txt = getBodyText(item);
      // Heuristic: once we see marker phrases, we assume body is available
      if (txt.includes("You've Received a Virtual Prepaid Card!") || /\b[A-Z0-9]{12}\b/.test(txt)) {
        return;
      }
    }
  };

  // 5) Main loop
  console.log('#,recipientEmail,redemptionCode,amount');

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Ensure body is loaded (important if Gmail collapses bodies)
    await ensureExpanded(item);
    await sleep(80);

    const recipientEmail = extractRecipient(item);

    const text = getBodyText(item);
    const redemptionCode = extractCode(text);
    const amount = extractAmount(text);

    console.log(`${i + 1},${recipientEmail},${redemptionCode},${amount}`);
  }
})();
