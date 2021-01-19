async function findElementBySelector(page, selector){
    const element = await page.evaluate(selector=> {
        return document.querySelector(selector)
    }, selector)
    return element
}

export async function wait(page, time){
    await page.waitForTimeout(time)
    return
}

export async function click(page, selector){
    const element = findElementBySelector(page,selector)
    if(element){ 
        console.log('Buscando por um botão')
        await page.click(selector)
        return
    }
    await wait(page, 2000)
    click(page, selector)
}

export async function type(page, selector, text){
    const element = findElementBySelector(page,selector)
    console.log('Buscando por um campo')
    if(element){ 
        await page.type(selector, text)
        return
    }
    await wait(page, 2000)
    click(page, selector, text)
}