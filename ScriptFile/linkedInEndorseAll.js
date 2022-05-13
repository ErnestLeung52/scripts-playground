// const endorseAll = () => {
//   const list = document.getElementsByClassName(
//     'artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--full artdeco-button--secondary ember-view scaffold-finite-scroll__load-button'
//   );
//   const endorse = (i, skill) =>
//     setTimeout(() => {
//       // skill.click()
//       console.log(`Endorsed ${i}`);
//     }, 500 * i);

//   if (list[0] !== undefined) {
//     console.log(list);
//     for (let i = 0; i < list.length; i += 1) {
//       list[i].click();
//     }
//   }

//   const endorseList = document.querySelectorAll('.pvs-list .pv2 button');
//   for (let i = 0; i < Math.ceil(endorseList.length / 2 + 1); i += 1) {
//     endorse(i, endorseList[i]);
//   }
// };

// const endorseFunction = () => {
//   const endorseList = document.querySelectorAll('.pvs-list .pv2 button');
//   const endorse = (i, skill) =>
//     setTimeout(() => {
//       skill.click();
//       console.log(`Endorsed ${i}`);
//     }, 500 * i);
//   for (let i = 0; i < Math.ceil(endorseList.length / 2 + 1); i += 1) {
//     endorse(i, endorseList[i]);
//   }
// };
// endorseFunction();
// };

// const endorseAll2 = async () => {

// One click to endorse all
// 1. (Optional) Run loadAll() to expand the list then wait for completed message until running endorseFunc
const clickLoadMore = (i) => {
  setTimeout(() => {
    const list = document.getElementsByClassName(
      'artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--full artdeco-button--secondary ember-view scaffold-finite-scroll__load-button'
    );
    console.log(i);
    if (list[0] === undefined) console.log('Completed loading all Skills');
    list[0].click();
  }, 2000 * i);
};

const loadAll = async () =>
  new Promise((resolve) => {
    for (let i = 0; i < 3; i += 1) {
      clickLoadMore(i);
    }
    resolve();
  });
await loadAll();

// 2. Click all endorse buttons ( scroll to the bottom of skill page and run endorseFunc if not running loadAll() first) * Will un-click buttons if it's already been clicked
const endorseFunction = () => {
  const endorseList = document.querySelectorAll('.pvs-list .pv2 button');
  for (let i = 0; i < Math.ceil(endorseList.length / 2 + 1); i += 1) {
    endorseList[i].click();
  }
};
endorseFunction();
