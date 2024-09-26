import React from 'react';
import { ICard } from '../types';
import './card.css';

function Card(props: { card: ICard }) {
  return (
    <img
      className="Card"
      src={props.card.url}
      alt={props.card.title}
    />
  );
}

export default Card;
