export default {
    downloadFile(filename, content) {
        var blob = new Blob([content])
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = filename
        link.click()
    },
}
