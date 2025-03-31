import { InlayHintKind } from 'typescript';
import { create } from 'zustand';

export default create(() =>
{
    return {
        base: 'viper',
        headstock: 'viper',
        inlay: 'bird',
        starPowerButton: true,
        baseColor: 'orange',
        neckColor: 'yellow',
        fretBoardColor: 'tan',
        fretBoardBindingColor: 'black',
        pickGuardColor: 'white',
        hardwareColor: 'gold',


        isRotationEnabled: true,
        isDynamicViewEnabled:true,
        isPostEffectsEnabled:true,
    }
})