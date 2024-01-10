export default function playNotification() {
    const audio = new Audio("/notification.mp3")
    audio.volume = 0.5
    audio.play()
}