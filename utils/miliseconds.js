export default function toMiliseconds(timeString = '00:00:00'){
    const splitedTimeString = timeString.trim().split(':')
    const timeNumbers = splitedTimeString.map(time => Number(time))
    const sortedTimeNumbers = timeNumbers.reverse()
    return calculateMiliseconds(...sortedTimeNumbers)
    
    function calculateMiliseconds(seconds = 0, minutes = 0, hours = 0){
        return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + seconds
    }
}