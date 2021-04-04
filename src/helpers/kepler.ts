// const {body2latlong} = require("keplerjs");
import { body2latlong } from 'keplerjs'
import { IPha } from '../api/Pha/model';
// const fs = require('fs')
// const data = require('./data.json')
interface ICelestialPosition {
  a: number,
  e: number,
  i: number,
  om: number,
  w: number,
  ma: number
}

interface ILatLng {
  lat: number,
  long: number
}

export const getPhaLatLng = ({ a, e, i, om, w, ma }: IPha) => {
  const magnitudes: ICelestialPosition = {
    a: a,
    e: e,
    i: i,
    om: om,
    w: w,
    ma: ma
  }

  const position: ILatLng = body2latlong(magnitudes);

  return position;
}