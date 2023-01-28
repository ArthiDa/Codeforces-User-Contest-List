let flag = document.getElementById("displayTable");

flag.style.display = "none";

document.getElementById("search").addEventListener("click", function (e) {
  let handle = document.getElementById("handle").value;
  document.getElementById("handle").value = "";
  if (handle) {
    flag.style.display = "none";
    const link = `https://codeforces.com/api/user.rating?handle=${handle}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => display(data));
  }
});

const display = (data) => {
  if (data.status === "FAILED") {
    let h3 = document.createElement("h3");
    h3.innerText = "User Not Found";
    h3.classList.add("text-center");
    document.getElementById("displayData").appendChild(h3);
  } else {
    data.result.reverse();
    flag.style.display = "table";
    document.getElementById("tbody").innerHTML = "";
    for (const ele of data.result) {
      const change = parseInt(ele.newRating) - parseInt(ele.oldRating);
      let tbody = document.getElementById("tbody");
      let tr = document.createElement("tr");
      //   console.log(ele.contestName);
      tr.innerHTML = `
              <th class="text-center" scope="row">${ele.contestId}</th>
              <td class="text-center">${ele.contestName}</td>
              <td class="text-center">${ele.oldRating}</td>
              <td class="text-center">${ele.newRating}</td>
              <td class="text-center">${ele.rank}</td>
              <td class="text-center">${change}</td>
          `;
      tbody.appendChild(tr);
      //   tr.appendChild(th);
    }
  }
};
