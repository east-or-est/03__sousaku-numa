import { format, zonedTimeToUtc } from 'date-fns-tz'


interface DateProps {
  time: string;
}


function Date({ time }: DateProps) {
  const text = zonedTimeToUtc(time, 'Asia/Tokyo')
  const date = format(text, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'Asia/Tokyo' })
  return (
    <time dateTime={date} className="en">
      {format(text, 'yyyy.MM.dd')}
    </time>
  )
}


export default Date