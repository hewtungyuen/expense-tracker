## Overview

Web application integrated with Telegram bot which enables tracking of personal expenses. 
Telegram bot used to easily track expenses on the go, while web app used to view past expenses in greater detail. 

## Key features

#### Telegram client

* Local mode (to record day-to-day expenses in Singapore)
  * Add personal expenses tagged with description and category
  * View total expenses for the current month

* Overseas mode (to record expenses during overseas trips)
  * Set trip name, exchange rate
  * Set custom currency conversion rates
  * Add personal expenses paid in SGD or in overseas currency
  * View total expenses for the current trip
  
#### Web app
* View total spending categorised by month and by overseas trip
* View statistics (amount spent in SGD, amount spent in overseas currency, amount spent for each category)
* View all transactions for each month / overseas trip

## Tech stack
Frontend: React, MaterialUI
Backend: MongoDB, Express, NodeJS
Telegram client: TelegrafJS
