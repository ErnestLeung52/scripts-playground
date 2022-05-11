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

// const endorseAll2 = async () => {
const clickLoadMore = (i) => {
  setTimeout(() => {
    const list = document.getElementsByClassName(
      'artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--full artdeco-button--secondary ember-view scaffold-finite-scroll__load-button'
    );
    console.log(i);
    list[0].click();
  }, 2000 * i);
};

const loadAll = async () =>
  new Promise((resolve) => {
    //   if (list[0] !== undefined) {
    for (let i = 0; i < 3; i += 1) {
      clickLoadMore(i);
      // }
    }
    resolve();
  });
await loadAll();

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

const endorseFunction = () => {
  const endorseList = document.querySelectorAll('.pvs-list .pv2 button');
  for (let i = 0; i < Math.ceil(endorseList.length / 2 + 1); i += 1) {
    endorseList[i].click();
  }
};
endorseFunction();
