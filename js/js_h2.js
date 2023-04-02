const numbers = d3.range(1);

const waffle = d3.select(".grilla");

const cardAvg = d3
  .select(".sidebar")
  .append("svg")
  .style("background-color", "green")
  .attr("class", "block");

function joinDeDatos(datos) {
  const cant_datos = d3.count(datos, (d) => d.rating);
  const avg_rating = d3.sum(datos, (d) => d.rating) / cant_datos;
  const avg_pace = d3.sum(datos, (d) => d.pace) / cant_datos;
  const avg_shooting = d3.sum(datos, (d) => d.shooting) / cant_datos;
  const avg_passing = d3.sum(datos, (d) => d.passing) / cant_datos;
  const avg_dribbling = d3.sum(datos, (d) => d.dribbling) / cant_datos;
  const avg_defending = d3.sum(datos, (d) => d.defending) / cant_datos;
  const avg_physical = d3.sum(datos, (d) => d.physical) / cant_datos;
  const posy = 80 * Math.sin(Math.PI / 3);

  console.log(avg_rating.toFixed(2));
  console.log(avg_pace.toFixed(2));
  console.log(avg_physical.toFixed(2));

  waffle
    .selectAll(".block")
    .data(datos)
    .join((enter) => {
      const svg = enter
        .append("svg")
        .attr("class", "block")
        .style("background-color", (d) => cardColor(d.rating));
      svg
        .append("image")
        .attr("href", (d) => "webscraper/players/" + d.name + ".png")
        .attr("x", 90)
        .attr("y", 10)
        .attr("height", 100)
        .attr("weigth", 100);

      svg
        .append("image")
        .attr("href", "assets/players/flag.png")
        .attr("x", 10)
        .attr("y", 80)
        .attr("height", 30)
        .attr("weigth", 20);

      svg
        .append("image")
        .attr("href", "assets/players/team.png")
        .attr("x", 10)
        .attr("y", 50)
        .attr("height", 30)
        .attr("weigth", 20);

      svg
        .append("text")
        .attr("class", "texto")
        .attr("x", 100)
        .attr("y", 130)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d) => d.name);

      svg
        .append("text")
        .attr("id", "club")
        .attr("class", "texto")
        .attr("x", 100)
        .attr("y", 150)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d) => d.club);

      svg
        .append("text")
        .attr("class", "texto")
        .attr("x", 25)
        .attr("y", 48)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d) => d.position);

      svg
        .append("text")
        .attr("class", "texto")
        .attr("x", 100)
        .attr("y", 170)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d) => d.league);

      svg
        .append("text")
        .attr("class", "rating")
        .attr("x", 25)
        .attr("y", 25)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d) => d.rating);

      svg
        .append("text")
        .attr("class", "params_chart")
        .attr("x", 50)
        .attr("y", 197)
        .text("SHO");

      svg
        .append("text")
        .attr("class", "params_chart")
        .attr("x", 130)
        .attr("y", 197)
        .text("PASS");

      svg
        .append("text")
        .attr("class", "params_chart")
        .attr("x", 181)
        .attr("y", 273)
        .text("DRI");

      svg
        .append("text")
        .attr("class", "params_chart")
        .attr("x", 130)
        .attr("y", 348)
        .text("DEF");

      svg
        .append("text")
        .attr("class", "params_chart")
        .attr("x", 50)
        .attr("y", 348)
        .text("PHY");

      svg
        .append("text")
        .attr("class", "params_chart")
        .attr("x", 1)
        .attr("y", 273)
        .text("PAC");

      svg
        .append("polygon")
        .attr(
          "points",
          "20,270 60," +
            String(270 - posy) +
            " 140," +
            String(270 - posy) +
            " 180,270 140," +
            String(270 + posy) +
            " 60," +
            String(270 + posy)
        )
        .attr("stroke", "black")
        .attr("fill", "white");

      svg
        .append("polyline")
        .attr(
          "points",
          "20,270 60," +
            String(270 - posy) +
            " 140," +
            String(270 - posy) +
            " 180,270 140," +
            String(270 + posy) +
            " 60," +
            String(270 + posy) +
            " 20,270 180,270 140," +
            String(270 - posy) +
            " 60," +
            String(270 + posy) +
            " 140," +
            String(270 + posy) +
            " 60," +
            String(270 - posy) +
            ""
        )
        .attr("stroke", "black")
        .attr("fill", "None");

      svg
        .append("polygon")
        .attr("points", (d) =>
          radarChart(
            d.dribbling,
            d.passing,
            d.shooting,
            d.pace,
            d.physical,
            d.defending
          )
        )
        .attr("stroke", (d) => radarChartColor(d.position))
        .attr("stroke-width", "4")
        .attr("fill", (d) => radarChartColor(d.position))
        .attr("fill-opacity", "0.4");

      svg
        .on("mouseover", function (d) {
          // console.log(d.fromElement.__data__.club)
          d3.select(this).attr("fill", "blue");
          console.log(this);
        })
        .on("mouseout", function (d) {
          d3.select(this).attr("fill", "black");
        });
    });

  cardAvg
    .append("image")
    .attr("href", "assets/players/balon.png")
    .attr("x", 90)
    .attr("y", 10)
    .attr("height", 100)
    .attr("weigth", 100);

  cardAvg
    .append("image")
    .attr("href", "assets/players/flag.png")
    .attr("x", 10)
    .attr("y", 70)
    .attr("height", 30)
    .attr("weigth", 20);

  cardAvg
    .append("image")
    .attr("href", "assets/players/team.png")
    .attr("x", 10)
    .attr("y", 40)
    .attr("height", 30)
    .attr("weigth", 20)
    .on("mouseover", handleMouseOver);

  cardAvg
    .append("text")
    .attr("class", "texto")
    .attr("x", 100)
    .attr("y", 130)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .text("FIFA 20");

  cardAvg
    .append("text")
    .attr("class", "texto")
    .attr("x", 100)
    .attr("y", 150)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .text("Cantidad de jugadores");

  cardAvg
    .append("text")
    .attr("class", "texto")
    .attr("x", 100)
    .attr("y", 170)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .text(cant_datos);

  cardAvg
    .append("text")
    .attr("class", "rating")
    .attr("x", 35)
    .attr("y", 25)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .text(avg_rating.toFixed(2));

  cardAvg
    .append("text")
    .attr("class", "params_chart")
    .attr("x", 50)
    .attr("y", 197)
    .text("SHO");

  cardAvg
    .append("text")
    .attr("class", "params_chart")
    .attr("x", 130)
    .attr("y", 197)
    .text("PASS");

  cardAvg
    .append("text")
    .attr("class", "params_chart")
    .attr("x", 181)
    .attr("y", 273)
    .text("DRI");

  cardAvg
    .append("text")
    .attr("class", "params_chart")
    .attr("x", 130)
    .attr("y", 348)
    .text("DEF");

  cardAvg
    .append("text")
    .attr("class", "params_chart")
    .attr("x", 50)
    .attr("y", 348)
    .text("PHY");

  cardAvg
    .append("text")
    .attr("class", "params_chart")
    .attr("x", 1)
    .attr("y", 273)
    .text("PAC");

  cardAvg
    .append("polygon")
    .attr(
      "points",
      "20,270 60," +
        String(270 - posy) +
        " 140," +
        String(270 - posy) +
        " 180,270 140," +
        String(270 + posy) +
        " 60," +
        String(270 + posy)
    )
    .attr("stroke", "black")
    .attr("fill", "white");

  cardAvg
    .append("polyline")
    .attr(
      "points",
      "20,270 60," +
        String(270 - posy) +
        " 140," +
        String(270 - posy) +
        " 180,270 140," +
        String(270 + posy) +
        " 60," +
        String(270 + posy) +
        " 20,270 180,270 140," +
        String(270 - posy) +
        " 60," +
        String(270 + posy) +
        " 140," +
        String(270 + posy) +
        " 60," +
        String(270 - posy) +
        ""
    )
    .attr("stroke", "black")
    .attr("fill", "None");

  cardAvg
    .append("polygon")
    .attr(
      "points",
      radarChart(
        avg_dribbling,
        avg_passing,
        avg_shooting,
        avg_pace,
        avg_physical,
        avg_defending
      )
    )
    .attr("stroke", "gold")
    .attr("stroke-width", "4")
    .attr("fill", "gold")
    .attr("fill-opacity", "0.4")
    .on("mouseover", handleMouseOver);
}

function radarChartColor(pos) {
  if (pos == "CB" || pos == "RB" || pos == "LB" || pos == "LWB" || pos == "RWB")
    return "blue";
  else if (
    pos == "CM" ||
    pos == "CAM" ||
    pos == "CDM" ||
    pos == "LM" ||
    pos == "RM"
  )
    return "green";
  else return "red";
}

function cardColor(rat) {
  if (rat >= 75 && rat <= 99) return "gold";
  else if (rat >= 60 && rat < 75) return "silver";
  else return "#cd7f32";
}

function handleMouseOver(d, i) {
  d3.select(this).attr({
    fill: "orange",
  });
}

function handleMouseOut(d, i) {
  d3.select(this).attr({
    fill: "black",
  });
}

function radarChart(dri, pass, sho, pac, phy, def) {
  const posy = 80 * Math.sin(Math.PI / 3);
  // dri
  dri_x = (80 * dri) / 99 + 100;
  dri_y = 270;
  dri_s = String(dri_x) + "," + String(dri_y);
  // pass
  pass_x = (40 * pass) / 99 + 100;
  pass_y = -(posy * pass) / 99 + 270;
  pass_s = String(pass_x) + "," + String(pass_y);
  // sho
  sho_x = -(40 * sho) / 99 + 100;
  sho_y = -(posy * sho) / 99 + 270;
  sho_s = String(sho_x) + "," + String(sho_y);
  // pac
  pac_x = -(80 * pac) / 99 + 100;
  pac_y = 270;
  pac_s = String(pac_x) + "," + String(pac_y);
  // phy
  phy_x = -(40 * phy) / 99 + 100;
  phy_y = (posy * phy) / 99 + 270;
  phy_s = String(phy_x) + "," + String(phy_y);
  // def
  def_x = (40 * def) / 99 + 100;
  def_y = (posy * def) / 99 + 270;
  def_s = String(def_x) + "," + String(def_y);

  return (
    dri_s + " " + pass_s + " " + sho_s + " " + pac_s + " " + phy_s + " " + def_s
  );
}

const parseo = (d) => ({
  name: d.name,
  club: d.club,
  league: d.league,
  position: d.position,
  tier: d.tier,
  rating: parseInt(d.rating),
  pace: parseInt(d.pace),
  shooting: parseInt(d.shooting),
  passing: parseInt(d.passing),
  dribbling: parseInt(d.dribbling),
  defending: parseInt(d.defending),
  physical: parseInt(d.physical),
});

d3.csv("assets/fifa_20_data.csv", parseo)
  .then((datos) => {
    joinDeDatos(datos);
  })
  .catch((error) => console.log(error));
