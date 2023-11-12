game.consoleOverlay.setVisible(true)
control.runInParallel(function () {
    console.log(`connecting 2 websocket wss://socketsbay.com/wss/v2/1/demo/`)

    {
        // string tests
        const ws = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")
        ws.onerror = () => console.log("error")
        ws.onmessage = (msg) => {
            const data = msg.data;
            console.log(`--> ${data}`)
        }
        ws.onopen = () => {
            forever(() => {
                const m = `makecode ${control.millis()}`;
                console.log(`<-- ${m}`)
                ws.send(m);
                pause(1000)
            })
        }
    }

    pause(500)

    {
        // binary tests
        const ws = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")
        ws.onerror = () => console.log("error")
        ws.onmessage = (msg) => {
            const data = msg.data;
            console.log(`--> ${(data as Buffer).toHex()}`)
        }
        ws.onopen = () => {
            forever(() => {
                const b = Buffer.fromArray([control.millis()]);
                console.log(`<-- ${b.toHex()}`)
                ws.send(b);
                pause(1000)
            })
        }
    }
})


