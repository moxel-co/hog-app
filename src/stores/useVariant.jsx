import { create } from 'zustand';

export default create(() =>
{
    return {
        // Guitar state
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

        // Settings state
        isRotationEnabled: true,
        isDynamicViewEnabled:true,
        isPostEffectsEnabled:true,


        // Camera state
        cameraPosition: [0, 5, 10],
        targetType: 'default',
        targetCameraPosition: [0, 5, 10],
        cameraTarget: [0, 4, 0],
        targetCameraTarget: [0, 4, 0],
    }
})