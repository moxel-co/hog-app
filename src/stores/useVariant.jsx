import { create } from 'zustand';

export default create((set, get) => ({
    // Guitar state
    body: 'body_arrow',
    headstock: 'headstock_arrow',
    headstock2: 'headstock_arrow',
    inlay: 'inlay_sharkfin',
    inlay2: 'inlay_sharkfin',
    starPowerButton: true,
    bodyColor: 'Blue',
    neckColor: 'Blue',
    fretBoardColor: 'Black',
    fretBoardBindingColor: 'Black',
    pickGuardColor: 'Black',
    hardwareColor: 'Silk Silver',
    inlayColor: 'White',
    neckButtonColor: 'White',
    neckBindingColor: 'Black',
    arcadeButtonColor: 'Black',
    strummerSideColor: 'Black',
    strummerOffset: 0,
    shadowOffset: 0,
    isDualNeck: false,
    dualNeckOffsetPos: [0, 0, 0],
    dualNeckOffsetRot: [0, 0, 0],
    dualNeckOffsetPosLeft: [0, 0, 0],
    dualNeckOffsetRotLeft: [0, 0, 0],
    isLeftHandOrientation: false,

    // Settings state
    isRotationEnabled: false,
    isDynamicViewEnabled: true,
    isPostEffectsEnabled: false,
    isShowcaseViewEnabled: false,

    // Camera state
    resetCamera: 0,
    cameraPosition: [0, 5, 10],
    targetType: 'default',
    targetCameraPosition: [0, 5, 10],
    cameraTarget: [0, 4, 0],
    targetCameraTarget: [0, 4, 0],
}));