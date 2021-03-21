const BTUS = [9000, 12000, 18000, 24000, 30000, 36000, 48000];

// Выборка BTU подходящего, диапозон лежит в BTUS
const snapto = (btu) => {
  return BTUS.reduce((prevBtu, currentBtu) =>
    Math.abs(currentBtu - btu) < Math.abs(prevBtu - btu) ? currentBtu : prevBtu
  );
};

// Функция вычисления BTU
function calc() {
  const coolingbtusqft = 26,
    trm_zone = parseFloat(document.getElementById("zone").value),
    trm_height_percent = parseFloat(document.getElementById("height").value),
    trm_insulation = parseFloat(document.getElementById("insulation").value),
    trm_sunny = parseFloat(document.getElementById("sunny").value),
    trm_windows = parseFloat(document.getElementById("windows").value),
    trm_tightness = parseFloat(document.getElementById("tightness").value),
    trm_glassroom = parseFloat(document.getElementById("glassroom").value),
    trm_occupants = parseInt(document.getElementById("people").value),
    trm_kitchen = parseInt(document.getElementById("kitchen").value),
    trm_devices_quantity = parseFloat(document.getElementById("devices").value);

  let trm_area = parseFloat(document.getElementById("area").value);
  let trm_height = 0;
  if (trm_height_percent > 8) {
    trm_height = (trm_height_percent - 8) * 0.06;
  }
  let trm_devices = 0;
  if (trm_devices_quantity > 0) {
    trm_devices = (trm_devices_quantity / 100) * 340;
  }

  const base_btu = trm_area * coolingbtusqft;
  const trm_btu =
    trm_zone +
    trm_height +
    trm_insulation +
    trm_sunny +
    trm_windows +
    trm_tightness +
    trm_glassroom;
  const total_btu =
    base_btu + base_btu * trm_btu + trm_occupants + trm_kitchen + trm_devices;
  const btu_100 = Math.ceil(total_btu / 100) * 100;
  const btu_snap = snapto(btu_100);

  // Генерируем параметр поиска
  let stag = btu_snap + " BTU";

  if (isNaN(total_btu) || total_btu <= 0) {
    document.querySelector("#btu_100 span").innerHTML("Invalid Input");
    document.querySelector("#btu_snap span").innerHTML("---");
    document.getElementById("findpro").style("visibility", "hidden");
  } else {
    document.querySelector("#btu_100 span").innerHTML =
      btu_100.toLocaleString() + " BTU";
    document.querySelector("#btu_snap span").innerHTML =
      btu_snap.toLocaleString() + " BTU";
    console.log(btu_snap.toLocaleString());

      $("#findpro")
      .css("visibility", "visible")
      .attr("href", "https://southminisplits.com/search?q=" + stag + "&type=product&product_cat=all");
  }
}

$(document).ready(function () {
  $(document).on("mouseup keyup change", "input,select", calc);
  calc();
  $(document).on("click", "#advcalc", function () {
    $(this).hide();
    $(".advcalc").removeClass("advcalc");
  });

  $("a.read").click(function () {
    var target = $(this).attr("href");
    $(target).addClass("readtarget");
    setTimeout(() => {
      $(target).removeClass("readtarget");
    }, 500);
  });
});


