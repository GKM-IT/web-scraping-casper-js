counter=250
fix_string='210742023'
while [ $counter -le 999 ]
do
  random_string=0
  if [ $counter -le 9 ] && [ $counter -ge 1 ]
  then
    random_string="00$counter"
  fi
  if [ $counter -le 99 ] && [ $counter -ge 10 ]
  then
    random_string="0$counter"
  fi
  if [ $counter -le 999 ] && [ $counter -ge 100 ]
  then
    random_string="$counter"
  fi
  echo "$fix_string$random_string"
  sleep 120 && casperjs ./avnl_scrapper.js "$fix_string$random_string"
  ((counter++))
done