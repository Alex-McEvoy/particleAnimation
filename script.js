const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// handle mouse interactions
const mouse = {
  x: null,
  y: null,
  radius: 150
};
