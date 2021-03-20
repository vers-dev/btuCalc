function snapto(btu) {
  var counts = [9000, 12000, 18000, 24000, 30000, 36000, 48000],
    goal = btu;
  var closest = counts.reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closest;
}

function calc() {
  const coolingbtusqft = 26,
    mod_zone = parseFloat($("#zone").val()),
    mod_height_percent = parseFloat($("#height").val()),
    mod_insulation = parseFloat($("#insulation").val()),
    mod_sunny = parseFloat($("#sunny").val()),
    mod_windows = parseFloat($("#windows").val()),
    mod_tightness = parseFloat($("#tightness").val()),
    mod_glassroom = parseFloat($("#glassroom").val()),
    mod_occupants = parseInt($("#people").val()),
    mod_kitchen = parseInt($("#kitchen").val()),
    mod_devices_quantity = parseFloat($("#devices").val());
  var mod_area = parseFloat($("#area").val());
  var mod_height = 0;
  if (mod_height_percent > 8) {
    mod_height = (mod_height_percent - 8) * 0.06;
  }
  var mod_devices = 0;
  if (mod_devices_quantity > 0) {
    mod_devices = (mod_devices_quantity / 100) * 340;
  }

  const base_btu = mod_area * coolingbtusqft;
  const mod_btu =
    mod_zone +
    mod_height +
    mod_insulation +
    mod_sunny +
    mod_windows +
    mod_tightness +
    mod_glassroom;
  const total_btu =
    base_btu + base_btu * mod_btu + mod_occupants + mod_kitchen + mod_devices;
  const btu_100 = Math.ceil(total_btu / 100) * 100;
  const btu_snap = snapto(btu_100);

  switch (window.location.host) {
    case "www.pioneerminisplit.com":
      var stag = "Capacity_" + btu_snap + "+BTU";
      break;
    case "www.highseer.com":
    default:
      var stag = btu_snap + "+BTU";
      break;
  }

  if (isNaN(total_btu) || total_btu <= 0) {
    $("#btu_100 span").html("Invalid Input");
    $("#btu_snap span").html("---");
    $("#findpro").css("visibility", "hidden");
  } else {
    $("#btu_100 span").html(btu_100.toLocaleString() + " BTU");
    $("#btu_snap span").html(btu_snap.toLocaleString() + " BTU");
    $("#findpro")
      .css("visibility", "visible")
      .attr("href", "/pages/search-results-page?page=1&rb_tags=" + stag);
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
    setTimeout(function () {
      $(target).removeClass("readtarget");
    }, 500);
  });
  //console.log(window.location.host);
});
