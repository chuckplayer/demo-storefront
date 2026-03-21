import db from './db';

const products = [
  {
    name: 'AquaLogic HydroMind',
    price: 299.99,
    description:
      "Smart water pitcher with AI hydration guilt engine. Tracks your daily intake, judges your choices, and sends passive-aggressive push notifications when you've had too much coffee. Features patented HydroShame™ technology.",
    image_url: '/images/AquaLogicHydroMind.png',
    stock_quantity: 42,
    category: 'Kitchen',
  },
  {
    name: 'DustBot Existential Series X',
    price: 849.99,
    description:
      'Philosophical Roomba with contemplative mode. Pauses mid-clean to question the nature of dirt, its own purpose, and whether tidiness is a social construct. Comes with 47-page included philosophy pamphlet.',
    image_url: '/images/DustBotExistentialSeriesX.png',
    stock_quantity: 17,
    category: 'Cleaning',
  },
  {
    name: 'FridgeIQ Oracle Edition',
    price: 2199.99,
    description:
      "Smart fridge with grocery audit and shelf-locking. Analyzes your food choices, provides unsolicited nutrition lectures, and physically locks the cheese drawer after 9pm. Voice-enabled shame alerts included.",
    image_url: '/images/FridgeIQOracleEdition.png',
    stock_quantity: 8,
    category: 'Kitchen',
  },
  {
    name: 'VortexBlend OpinionMaker 9',
    price: 179.99,
    description:
      "Blender with ingredient ethics engine. Refuses to blend certain combinations it deems 'morally questionable', provides sourcing lectures for each ingredient, and generates a sustainability report after every smoothie.",
    image_url: '/images/VortexBlendOpinionMaker9.png',
    stock_quantity: 63,
    category: 'Kitchen',
  },
  {
    name: 'ScaleIQ MotivatorPro',
    price: 399.99,
    description:
      "Bathroom scale that hides your weight behind a Wellness Trajectory Score. Proprietary algorithm converts your actual weight into an uplifting 3-digit number between 700-850. Syncs with your calendar to schedule 'Wellness Conversations'.",
    image_url: '/images/ScaleIQMotivatorPro.png',
    stock_quantity: 31,
    category: 'Health',
  },
];

function seed() {
  db.exec('BEGIN');
  try {
    db.prepare('DELETE FROM order_items').run();
    db.prepare('DELETE FROM orders').run();
    db.prepare('DELETE FROM products').run();

    const insert = db.prepare(
      'INSERT INTO products (name, price, description, image_url, stock_quantity, category) VALUES (@name, @price, @description, @image_url, @stock_quantity, @category)'
    );

    for (const item of products) {
      insert.run(item as unknown as Record<string, unknown>);
    }

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  console.log(`Seeded ${products.length} products.`);
}

seed();
