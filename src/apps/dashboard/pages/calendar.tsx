import { useState } from 'react'
import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isMonthYearPickerOpen, setIsMonthYearPickerOpen] = useState(false)

  // Load email from localStorage on mount

  const handleMonthSelect = (month: number) => {
    const updated = new Date(currentMonth)
    updated.setMonth(month)
    setCurrentMonth(updated)
    setIsMonthYearPickerOpen(false)
  }

  const renderHeader = () => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsMonthYearPickerOpen(!isMonthYearPickerOpen)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-[#0B0D11] text-white border-white/10"
          >
            {format(currentMonth, 'MMMM, yyyy')}
            <ChevronDown className="h-4 w-4 text-white" />
          </Button>

          {isMonthYearPickerOpen && (
            <div className="absolute z-10 mt-2 w-64 rounded-lg border border-white/10 bg-[#0B0D11] p-4 shadow text-white">
              <div className="mb-2 text-center font-semibold">
                {format(currentMonth, 'yyyy')}
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {[
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ].map((month, index) => (
                  <button
                    key={index}
                    onClick={() => handleMonthSelect(index)}
                    className={`rounded px-2 py-1 ${
                      index === currentMonth.getMonth()
                        ? 'bg-white text-[#0B0D11]'
                        : 'bg-[#0B0D11] text-white'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight />
        </Button>
        <Button
          onClick={() => setCurrentMonth(new Date())}
          className="text-sm bg-white/10 text-white"
        >
          Today
        </Button>
      </div>
    </div>
  )

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = addDays(startDate, 34)

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const rows = []
    let days = []
    let day = startDate

    rows.push(
      <div
        key="days-names"
        className="mb-2 hidden grid-cols-7 text-sm font-semibold text-gray-400 xl:grid"
      >
        {daysOfWeek.map((d, idx) => (
          <div key={idx} className="p-2 text-center">
            {d}
          </div>
        ))}
      </div>
    )

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const isSelected = isSameDay(cloneDay, selectedDate)
        const isCurrent = isToday(cloneDay)

        days.push(
          <div
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
            className={`flex min-h-[200px] cursor-pointer flex-col justify-between rounded-lg border p-4 shadow transition
              ${
                !isSameMonth(day, monthStart)
                  ? 'bg-[#0B0D11] text-gray-500'
                  : 'bg-[#1a1d22] text-white'
              }
              ${isSelected ? 'border-blue-500 bg-blue-900' : ''}
              ${isCurrent ? 'ring-2 ring-blue-300' : ''}
            `}
          >
            <div className="text-xs font-semibold">
              <div className="mb-1 block font-medium xl:hidden text-gray-400">
                {format(day, 'EEE')}
              </div>
              <span>{format(day, 'd')}</span>
            </div>
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div
          key={day.toString()}
          className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
        >
          {days}
        </div>
      )
      days = []
    }

    return <div>{rows}</div>
  }

  return (
    <div className="min-h-screen w-full p-4 bg-[#0B0D11] text-white">
      <div className="mx-auto max-w-[1600px]">
        {/* Top Cards Row */}

        {renderHeader()}
        {renderCells()}
      </div>
    </div>
  )
}

export default Calendar
