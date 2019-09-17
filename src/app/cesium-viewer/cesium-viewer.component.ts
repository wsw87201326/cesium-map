import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import * as _ from 'lodash';

@Component({
    selector: 'app-cesium-viewer',
    templateUrl: './cesium-viewer.component.html',
    styleUrls: ['./cesium-viewer.component.scss']
})
export class CesiumViewerComponent implements OnInit, OnDestroy {
    @ViewChild('globeContainer', { static: true }) globeContainerRef: ElementRef;

    @Input() viewerOptions: any = {}; // 创建Cesium.Viewer的属性配置
    @Input() rectangle: any; // 初始范围
    @Input() enablePosition = true; // 启用位置信息部件
    @Output() viewerReady: EventEmitter<any> = new EventEmitter<any>(false); // 组件初始化完成事件

    private globeContainer: HTMLDivElement;
    private viewer: any; // 视图
    private scene: any; // 三维场景
    private globe: any; // 三维球体
    private ellipsoid: any; // 三维场景的椭球体
    private defaultViewerOptions = {
        contextOptions: {
            webgl: {
                preserveDrawingBuffer: true
            }
        },
        timeline: false,
        animation: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        scene3DOnly: true,
        selectionIndicator: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        fullscreenButton: false,
        fullscreenElement: this.globeContainer // 设置viewer所在元素为全屏的元素
    };

    constructor() {}

    ngOnInit() {
        this.globeContainer = this.globeContainerRef.nativeElement;
        const viewerOptions = this.viewerOptions
            ? _.merge({}, this.defaultViewerOptions, this.viewerOptions)
            : this.defaultViewerOptions;
        if (viewerOptions.globe === false) {
            viewerOptions.imageryProvider = null;
            viewerOptions.terrainProvider = null;
        }
        this.viewer = new Cesium.Viewer(this.globeContainer, viewerOptions);
        this.scene = this.viewer.scene;
        this.globe = this.scene.globe;
        this.ellipsoid = this.globe && this.globe.ellipsoid;
        this.viewer.cesiumWidget.creditContainer['style'].display = 'none'; // 隐藏默认的版权信息

        this.viewerReady.emit({
            viewer: this.viewer,
            scene: this.scene,
            globe: this.globe,
            ellipsoid: this.ellipsoid
        });
    }

    ngOnDestroy() {
        this.viewer.destroy();
    }
}
