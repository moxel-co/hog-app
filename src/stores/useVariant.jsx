import { create } from 'zustand';

export default create(() =>
{
    return {
        body: 'body_briefcase',
        headstock: 'headstock_briefcase',
        inlay: 'inlay_bird',
        starPowerButton: true,
        bodyColor: 'orange',
        neckColor: 'yellow',
        fretBoardColor: 'tan',
        fretBoardBindingColor: 'black',
        pickGuardColor: 'white',
        hardwareColor: 'gold',


        isRotationEnabled: true,
        isDynamicViewEnabled:true,
        isPostEffectsEnabled:false,
    }
})