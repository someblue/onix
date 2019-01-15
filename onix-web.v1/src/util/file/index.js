import Rx from 'rx'

export default {
    downloadFile(filename, content) {
        var blob = new Blob([content])
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = filename
        link.click()
    },
    // not support multifiles now
    uploadFile() {
        return Rx.Observable.create(function (observer) {
            var input = document.createElement('input')
            input.type = 'file'
            input.onchange = (eInput) => {
                if (!eInput.target || !eInput.target.files || !eInput.target.files[0]) {
                    observer.onNext('')
                    observer.onCompleted()
                }
                var reader = new FileReader()
                reader.onload = eReader => {
                    observer.onNext(reader.result)
                    observer.onCompleted()
                }
                reader.readAsText(eInput.target.files[0])
            }
            input.click()
        })
    },
}
