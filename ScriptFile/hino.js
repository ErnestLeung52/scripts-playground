const sellerName = document.querySelector('.dealer-name span:nth-child(2)').textContent.trim();
const sellerLink = document.querySelector('.dealerWebsiteLink')?.href.trim();
const vinNum = document.getElementById('lct VIN').textContent.trim();

const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
const stateLinkIndex = breadcrumbLinks.length - 2;
const stateName = breadcrumbLinks[stateLinkIndex].textContent.trim();

console.log(`${vinNum},${sellerName},${sellerLink},${stateName}`);
