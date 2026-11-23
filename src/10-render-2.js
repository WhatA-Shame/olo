// 10-render-2.js — render｜15 个顶层语句｜68KB
// 对应 game.pretty.js 第 18127–20745 行
// 关键内容：
//   aR                    additive
//   oR                    instanceMatrix
//   rR                    WEBGL_multi_draw
//   lR                    EXT_texture_filter_anisotropic
//   fR                    dispose
//   hR                    position
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Dr, Ee, Gs, Rr, W3, _5, b5, df, dm, ff, fo, jn, mi, pi } from './04-audio-2.js';
import { In, Je, dt, go } from './05-three.js';
import { Ke, Ut, sa } from './06-three-2.js';
import { An, Bn, G7, Oh, On, Sn, g0, hf, ki, vM } from './07-three-3.js';
import { Gl, ox } from './08-three-4.js';
import { $A, $E, AA, AE, BA, BE, CA, CE, DA, DE, EA, EE, FA, FE, GA, GE, HA, HE, IA, IE, JA, JE, KA, KE, LA, LE, M9, MA, NA, NE, OA, OE, PA, PE, QA, QE, RA, RE, SA, SE, TA, TE, UA, UE, VA, VE, WA, WE, XA, XE, YA, YE, ZA, ZE, _9, _A, a9, aA, b9, bA, c9, cA, d9, dA, e9, eA, f9, fA, g9, gA, h9, hA, i9, iA, jA, jE, kA, l9, lA, m9, mA, n9, nA, o9, oA, p9, pA, qA, qE, r9, rA, s9, sA, t9, tA, u9, uA, v9, vA, w9, wA, x9, xA, y9, yA, zA, zE } from './09-render.js';

const k9 = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  S9 = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  T9 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  E9 = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  A9 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  R9 = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  C9 = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  L9 = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  I9 = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  P9 = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
  D9 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  z9 = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  N9 = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  F9 = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  U9 = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  O9 = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  B9 = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  H9 = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  $9 = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  G9 = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  V9 = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  W9 = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  j9 = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  q9 = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  X9 = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  Y9 = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  K9 = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Z9 = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Q9 = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  J9 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  tR = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  eR = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  nR = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  sR = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  tn = {
    alphahash_fragment: SE,
    alphahash_pars_fragment: TE,
    alphamap_fragment: EE,
    alphamap_pars_fragment: AE,
    alphatest_fragment: RE,
    alphatest_pars_fragment: CE,
    aomap_fragment: LE,
    aomap_pars_fragment: IE,
    batching_pars_vertex: PE,
    batching_vertex: DE,
    begin_vertex: zE,
    beginnormal_vertex: NE,
    bsdfs: FE,
    iridescence_fragment: UE,
    bumpmap_pars_fragment: OE,
    clipping_planes_fragment: BE,
    clipping_planes_pars_fragment: HE,
    clipping_planes_pars_vertex: $E,
    clipping_planes_vertex: GE,
    color_fragment: VE,
    color_pars_fragment: WE,
    color_pars_vertex: jE,
    color_vertex: qE,
    common: XE,
    cube_uv_reflection_fragment: YE,
    defaultnormal_vertex: KE,
    displacementmap_pars_vertex: ZE,
    displacementmap_vertex: QE,
    emissivemap_fragment: JE,
    emissivemap_pars_fragment: tA,
    colorspace_fragment: eA,
    colorspace_pars_fragment: nA,
    envmap_fragment: sA,
    envmap_common_pars_fragment: iA,
    envmap_pars_fragment: aA,
    envmap_pars_vertex: oA,
    envmap_physical_pars_fragment: xA,
    envmap_vertex: rA,
    fog_vertex: lA,
    fog_pars_vertex: cA,
    fog_fragment: fA,
    fog_pars_fragment: dA,
    gradientmap_pars_fragment: hA,
    lightmap_pars_fragment: uA,
    lights_lambert_fragment: pA,
    lights_lambert_pars_fragment: mA,
    lights_pars_begin: gA,
    lights_toon_fragment: yA,
    lights_toon_pars_fragment: vA,
    lights_phong_fragment: bA,
    lights_phong_pars_fragment: _A,
    lights_physical_fragment: wA,
    lights_physical_pars_fragment: MA,
    lights_fragment_begin: kA,
    lights_fragment_maps: SA,
    lights_fragment_end: TA,
    logdepthbuf_fragment: EA,
    logdepthbuf_pars_fragment: AA,
    logdepthbuf_pars_vertex: RA,
    logdepthbuf_vertex: CA,
    map_fragment: LA,
    map_pars_fragment: IA,
    map_particle_fragment: PA,
    map_particle_pars_fragment: DA,
    metalnessmap_fragment: zA,
    metalnessmap_pars_fragment: NA,
    morphinstance_vertex: FA,
    morphcolor_vertex: UA,
    morphnormal_vertex: OA,
    morphtarget_pars_vertex: BA,
    morphtarget_vertex: HA,
    normal_fragment_begin: $A,
    normal_fragment_maps: GA,
    normal_pars_fragment: VA,
    normal_pars_vertex: WA,
    normal_vertex: jA,
    normalmap_pars_fragment: qA,
    clearcoat_normal_fragment_begin: XA,
    clearcoat_normal_fragment_maps: YA,
    clearcoat_pars_fragment: KA,
    iridescence_pars_fragment: ZA,
    opaque_fragment: QA,
    packing: JA,
    premultiplied_alpha_fragment: t9,
    project_vertex: e9,
    dithering_fragment: n9,
    dithering_pars_fragment: s9,
    roughnessmap_fragment: i9,
    roughnessmap_pars_fragment: a9,
    shadowmap_pars_fragment: o9,
    shadowmap_pars_vertex: r9,
    shadowmap_vertex: l9,
    shadowmask_pars_fragment: c9,
    skinbase_vertex: f9,
    skinning_pars_vertex: d9,
    skinning_vertex: h9,
    skinnormal_vertex: u9,
    specularmap_fragment: p9,
    specularmap_pars_fragment: m9,
    tonemapping_fragment: g9,
    tonemapping_pars_fragment: x9,
    transmission_fragment: y9,
    transmission_pars_fragment: v9,
    uv_pars_fragment: b9,
    uv_pars_vertex: _9,
    uv_vertex: w9,
    worldpos_vertex: M9,
    background_vert: k9,
    background_frag: S9,
    backgroundCube_vert: T9,
    backgroundCube_frag: E9,
    cube_vert: A9,
    cube_frag: R9,
    depth_vert: C9,
    depth_frag: L9,
    distanceRGBA_vert: I9,
    distanceRGBA_frag: P9,
    equirect_vert: D9,
    equirect_frag: z9,
    linedashed_vert: N9,
    linedashed_frag: F9,
    meshbasic_vert: U9,
    meshbasic_frag: O9,
    meshlambert_vert: B9,
    meshlambert_frag: H9,
    meshmatcap_vert: $9,
    meshmatcap_frag: G9,
    meshnormal_vert: V9,
    meshnormal_frag: W9,
    meshphong_vert: j9,
    meshphong_frag: q9,
    meshphysical_vert: X9,
    meshphysical_frag: Y9,
    meshtoon_vert: K9,
    meshtoon_frag: Z9,
    points_vert: Q9,
    points_frag: J9,
    shadow_vert: tR,
    shadow_frag: eR,
    sprite_vert: nR,
    sprite_frag: sR,
  },
  ee = {
    common: {
      diffuse: { value: new Ut(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new Je() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Je() },
      alphaTest: { value: 0 },
    },
    specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Je() } },
    envmap: {
      envMap: { value: null },
      envMapRotation: { value: new Je() },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
    },
    aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Je() } },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new Je() },
    },
    bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Je() }, bumpScale: { value: 1 } },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new Je() },
      normalScale: { value: new Ee(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new Je() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Je() } },
    metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Je() } },
    roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Je() } },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new Ut(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: { value: [], properties: { direction: {}, color: {} } },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
      rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new Ut(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Je() },
      alphaTest: { value: 0 },
      uvTransform: { value: new Je() },
    },
    sprite: {
      diffuse: { value: new Ut(16777215) },
      opacity: { value: 1 },
      center: { value: new Ee(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new Je() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Je() },
      alphaTest: { value: 0 },
    },
  },
  Io = {
    basic: {
      uniforms: ki([ee.common, ee.specularmap, ee.envmap, ee.aomap, ee.lightmap, ee.fog]),
      vertexShader: tn.meshbasic_vert,
      fragmentShader: tn.meshbasic_frag,
    },
    lambert: {
      uniforms: ki([
        ee.common,
        ee.specularmap,
        ee.envmap,
        ee.aomap,
        ee.lightmap,
        ee.emissivemap,
        ee.bumpmap,
        ee.normalmap,
        ee.displacementmap,
        ee.fog,
        ee.lights,
        { emissive: { value: new Ut(0) } },
      ]),
      vertexShader: tn.meshlambert_vert,
      fragmentShader: tn.meshlambert_frag,
    },
    phong: {
      uniforms: ki([
        ee.common,
        ee.specularmap,
        ee.envmap,
        ee.aomap,
        ee.lightmap,
        ee.emissivemap,
        ee.bumpmap,
        ee.normalmap,
        ee.displacementmap,
        ee.fog,
        ee.lights,
        { emissive: { value: new Ut(0) }, specular: { value: new Ut(1118481) }, shininess: { value: 30 } },
      ]),
      vertexShader: tn.meshphong_vert,
      fragmentShader: tn.meshphong_frag,
    },
    standard: {
      uniforms: ki([
        ee.common,
        ee.envmap,
        ee.aomap,
        ee.lightmap,
        ee.emissivemap,
        ee.bumpmap,
        ee.normalmap,
        ee.displacementmap,
        ee.roughnessmap,
        ee.metalnessmap,
        ee.fog,
        ee.lights,
        {
          emissive: { value: new Ut(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: tn.meshphysical_vert,
      fragmentShader: tn.meshphysical_frag,
    },
    toon: {
      uniforms: ki([
        ee.common,
        ee.aomap,
        ee.lightmap,
        ee.emissivemap,
        ee.bumpmap,
        ee.normalmap,
        ee.displacementmap,
        ee.gradientmap,
        ee.fog,
        ee.lights,
        { emissive: { value: new Ut(0) } },
      ]),
      vertexShader: tn.meshtoon_vert,
      fragmentShader: tn.meshtoon_frag,
    },
    matcap: {
      uniforms: ki([
        ee.common,
        ee.bumpmap,
        ee.normalmap,
        ee.displacementmap,
        ee.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: tn.meshmatcap_vert,
      fragmentShader: tn.meshmatcap_frag,
    },
    points: {
      uniforms: ki([ee.points, ee.fog]),
      vertexShader: tn.points_vert,
      fragmentShader: tn.points_frag,
    },
    dashed: {
      uniforms: ki([
        ee.common,
        ee.fog,
        { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } },
      ]),
      vertexShader: tn.linedashed_vert,
      fragmentShader: tn.linedashed_frag,
    },
    depth: {
      uniforms: ki([ee.common, ee.displacementmap]),
      vertexShader: tn.depth_vert,
      fragmentShader: tn.depth_frag,
    },
    normal: {
      uniforms: ki([ee.common, ee.bumpmap, ee.normalmap, ee.displacementmap, { opacity: { value: 1 } }]),
      vertexShader: tn.meshnormal_vert,
      fragmentShader: tn.meshnormal_frag,
    },
    sprite: {
      uniforms: ki([ee.sprite, ee.fog]),
      vertexShader: tn.sprite_vert,
      fragmentShader: tn.sprite_frag,
    },
    background: {
      uniforms: { uvTransform: { value: new Je() }, t2D: { value: null }, backgroundIntensity: { value: 1 } },
      vertexShader: tn.background_vert,
      fragmentShader: tn.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
        backgroundRotation: { value: new Je() },
      },
      vertexShader: tn.backgroundCube_vert,
      fragmentShader: tn.backgroundCube_frag,
    },
    cube: {
      uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } },
      vertexShader: tn.cube_vert,
      fragmentShader: tn.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: tn.equirect_vert,
      fragmentShader: tn.equirect_frag,
    },
    distanceRGBA: {
      uniforms: ki([
        ee.common,
        ee.displacementmap,
        { referencePosition: { value: new dt() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } },
      ]),
      vertexShader: tn.distanceRGBA_vert,
      fragmentShader: tn.distanceRGBA_frag,
    },
    shadow: {
      uniforms: ki([ee.lights, ee.fog, { color: { value: new Ut(0) }, opacity: { value: 1 } }]),
      vertexShader: tn.shadow_vert,
      fragmentShader: tn.shadow_frag,
    },
  };

Io.physical = {
  uniforms: ki([
    Io.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new Je() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new Je() },
      clearcoatNormalScale: { value: new Ee(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new Je() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new Je() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new Je() },
      sheen: { value: 0 },
      sheenColor: { value: new Ut(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new Je() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new Je() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new Je() },
      transmissionSamplerSize: { value: new Ee() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new Je() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new Ut(0) },
      specularColor: { value: new Ut(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new Je() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new Je() },
      anisotropyVector: { value: new Ee() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new Je() },
    },
  ]),
  vertexShader: tn.meshphysical_vert,
  fragmentShader: tn.meshphysical_frag,
};

const Fu = { r: 0, b: 0, g: 0 },
  K0 = new sa(),
  iR = new Ke();

function aR(n, t, e, s, i, a, o) {
  const r = new Ut(0);
  let l = a === !0 ? 0 : 1,
    c,
    f,
    d = null,
    h = 0,
    u = null;
  function m(v) {
    let _ = v.isScene === !0 ? v.background : null;
    return (_ && _.isTexture && (_ = (v.backgroundBlurriness > 0 ? e : t).get(_)), _);
  }
  function x(v) {
    let _ = !1;
    const k = m(v);
    k === null ? g(r, l) : k && k.isColor && (g(k, 1), (_ = !0));
    const M = n.xr.getEnvironmentBlendMode();
    (M === "additive"
      ? s.buffers.color.setClear(0, 0, 0, 1, o)
      : M === "alpha-blend" && s.buffers.color.setClear(0, 0, 0, 0, o),
      (n.autoClear || _) &&
        (s.buffers.depth.setTest(!0),
        s.buffers.depth.setMask(!0),
        s.buffers.color.setMask(!0),
        n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil)));
  }
  function p(v, _) {
    const k = m(_);
    k && (k.isCubeTexture || k.mapping === dm)
      ? (f === void 0 &&
          ((f = new Sn(
            new Oh(1, 1, 1),
            new An({
              name: "BackgroundCubeMaterial",
              uniforms: hf(Io.backgroundCube.uniforms),
              vertexShader: Io.backgroundCube.vertexShader,
              fragmentShader: Io.backgroundCube.fragmentShader,
              side: pi,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            }),
          )),
          f.geometry.deleteAttribute("normal"),
          f.geometry.deleteAttribute("uv"),
          (f.onBeforeRender = function (M, S, b) {
            this.matrixWorld.copyPosition(b.matrixWorld);
          }),
          Object.defineProperty(f.material, "envMap", {
            get: function () {
              return this.uniforms.envMap.value;
            },
          }),
          i.update(f)),
        K0.copy(_.backgroundRotation),
        (K0.x *= -1),
        (K0.y *= -1),
        (K0.z *= -1),
        k.isCubeTexture && k.isRenderTargetTexture === !1 && ((K0.y *= -1), (K0.z *= -1)),
        (f.material.uniforms.envMap.value = k),
        (f.material.uniforms.flipEnvMap.value = k.isCubeTexture && k.isRenderTargetTexture === !1 ? -1 : 1),
        (f.material.uniforms.backgroundBlurriness.value = _.backgroundBlurriness),
        (f.material.uniforms.backgroundIntensity.value = _.backgroundIntensity),
        f.material.uniforms.backgroundRotation.value.setFromMatrix4(iR.makeRotationFromEuler(K0)),
        (f.material.toneMapped = In.getTransfer(k.colorSpace) !== jn),
        (d !== k || h !== k.version || u !== n.toneMapping) &&
          ((f.material.needsUpdate = !0), (d = k), (h = k.version), (u = n.toneMapping)),
        f.layers.enableAll(),
        v.unshift(f, f.geometry, f.material, 0, 0, null))
      : k &&
        k.isTexture &&
        (c === void 0 &&
          ((c = new Sn(
            new Gl(2, 2),
            new An({
              name: "BackgroundMaterial",
              uniforms: hf(Io.background.uniforms),
              vertexShader: Io.background.vertexShader,
              fragmentShader: Io.background.fragmentShader,
              side: Rr,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            }),
          )),
          c.geometry.deleteAttribute("normal"),
          Object.defineProperty(c.material, "map", {
            get: function () {
              return this.uniforms.t2D.value;
            },
          }),
          i.update(c)),
        (c.material.uniforms.t2D.value = k),
        (c.material.uniforms.backgroundIntensity.value = _.backgroundIntensity),
        (c.material.toneMapped = In.getTransfer(k.colorSpace) !== jn),
        k.matrixAutoUpdate === !0 && k.updateMatrix(),
        c.material.uniforms.uvTransform.value.copy(k.matrix),
        (d !== k || h !== k.version || u !== n.toneMapping) &&
          ((c.material.needsUpdate = !0), (d = k), (h = k.version), (u = n.toneMapping)),
        c.layers.enableAll(),
        v.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function g(v, _) {
    (v.getRGB(Fu, vM(n)), s.buffers.color.setClear(Fu.r, Fu.g, Fu.b, _, o));
  }
  function y() {
    (f !== void 0 && (f.geometry.dispose(), f.material.dispose(), (f = void 0)),
      c !== void 0 && (c.geometry.dispose(), c.material.dispose(), (c = void 0)));
  }
  return {
    getClearColor: function () {
      return r;
    },
    setClearColor: function (v, _ = 1) {
      (r.set(v), (l = _), g(r, l));
    },
    getClearAlpha: function () {
      return l;
    },
    setClearAlpha: function (v) {
      ((l = v), g(r, l));
    },
    render: x,
    addToRenderList: p,
    dispose: y,
  };
}

function oR(n, t) {
  const e = n.getParameter(n.MAX_VERTEX_ATTRIBS),
    s = {},
    i = h(null);
  let a = i,
    o = !1;
  function r(T, E, A, C, R) {
    let I = !1;
    const P = d(C, A, E);
    (a !== P && ((a = P), c(a.object)),
      (I = u(T, C, A, R)),
      I && m(T, C, A, R),
      R !== null && t.update(R, n.ELEMENT_ARRAY_BUFFER),
      (I || o) &&
        ((o = !1), _(T, E, A, C), R !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, t.get(R).buffer)));
  }
  function l() {
    return n.createVertexArray();
  }
  function c(T) {
    return n.bindVertexArray(T);
  }
  function f(T) {
    return n.deleteVertexArray(T);
  }
  function d(T, E, A) {
    const C = A.wireframe === !0;
    let R = s[T.id];
    R === void 0 && ((R = {}), (s[T.id] = R));
    let I = R[E.id];
    I === void 0 && ((I = {}), (R[E.id] = I));
    let P = I[C];
    return (P === void 0 && ((P = h(l())), (I[C] = P)), P);
  }
  function h(T) {
    const E = [],
      A = [],
      C = [];
    for (let R = 0; R < e; R++) ((E[R] = 0), (A[R] = 0), (C[R] = 0));
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: E,
      enabledAttributes: A,
      attributeDivisors: C,
      object: T,
      attributes: {},
      index: null,
    };
  }
  function u(T, E, A, C) {
    const R = a.attributes,
      I = E.attributes;
    let P = 0;
    const F = A.getAttributes();
    for (const L in F)
      if (F[L].location >= 0) {
        const G = R[L];
        let q = I[L];
        if (
          (q === void 0 &&
            (L === "instanceMatrix" && T.instanceMatrix && (q = T.instanceMatrix),
            L === "instanceColor" && T.instanceColor && (q = T.instanceColor)),
          G === void 0 || G.attribute !== q || (q && G.data !== q.data))
        )
          return !0;
        P++;
      }
    return a.attributesNum !== P || a.index !== C;
  }
  function m(T, E, A, C) {
    const R = {},
      I = E.attributes;
    let P = 0;
    const F = A.getAttributes();
    for (const L in F)
      if (F[L].location >= 0) {
        let G = I[L];
        G === void 0 &&
          (L === "instanceMatrix" && T.instanceMatrix && (G = T.instanceMatrix),
          L === "instanceColor" && T.instanceColor && (G = T.instanceColor));
        const q = {};
        ((q.attribute = G), G && G.data && (q.data = G.data), (R[L] = q), P++);
      }
    ((a.attributes = R), (a.attributesNum = P), (a.index = C));
  }
  function x() {
    const T = a.newAttributes;
    for (let E = 0, A = T.length; E < A; E++) T[E] = 0;
  }
  function p(T) {
    g(T, 0);
  }
  function g(T, E) {
    const A = a.newAttributes,
      C = a.enabledAttributes,
      R = a.attributeDivisors;
    ((A[T] = 1),
      C[T] === 0 && (n.enableVertexAttribArray(T), (C[T] = 1)),
      R[T] !== E && (n.vertexAttribDivisor(T, E), (R[T] = E)));
  }
  function y() {
    const T = a.newAttributes,
      E = a.enabledAttributes;
    for (let A = 0, C = E.length; A < C; A++) E[A] !== T[A] && (n.disableVertexAttribArray(A), (E[A] = 0));
  }
  function v(T, E, A, C, R, I, P) {
    P === !0 ? n.vertexAttribIPointer(T, E, A, R, I) : n.vertexAttribPointer(T, E, A, C, R, I);
  }
  function _(T, E, A, C) {
    x();
    const R = C.attributes,
      I = A.getAttributes(),
      P = E.defaultAttributeValues;
    for (const F in I) {
      const L = I[F];
      if (L.location >= 0) {
        let B = R[F];
        if (
          (B === void 0 &&
            (F === "instanceMatrix" && T.instanceMatrix && (B = T.instanceMatrix),
            F === "instanceColor" && T.instanceColor && (B = T.instanceColor)),
          B !== void 0)
        ) {
          const G = B.normalized,
            q = B.itemSize,
            et = t.get(B);
          if (et === void 0) continue;
          const ct = et.buffer,
            rt = et.type,
            mt = et.bytesPerElement,
            nt = rt === n.INT || rt === n.UNSIGNED_INT || B.gpuType === W3;
          if (B.isInterleavedBufferAttribute) {
            const H = B.data,
              st = H.stride,
              tt = B.offset;
            if (H.isInstancedInterleavedBuffer) {
              for (let it = 0; it < L.locationSize; it++) g(L.location + it, H.meshPerAttribute);
              T.isInstancedMesh !== !0 &&
                C._maxInstanceCount === void 0 &&
                (C._maxInstanceCount = H.meshPerAttribute * H.count);
            } else for (let it = 0; it < L.locationSize; it++) p(L.location + it);
            n.bindBuffer(n.ARRAY_BUFFER, ct);
            for (let it = 0; it < L.locationSize; it++)
              v(
                L.location + it,
                q / L.locationSize,
                rt,
                G,
                st * mt,
                (tt + (q / L.locationSize) * it) * mt,
                nt,
              );
          } else {
            if (B.isInstancedBufferAttribute) {
              for (let H = 0; H < L.locationSize; H++) g(L.location + H, B.meshPerAttribute);
              T.isInstancedMesh !== !0 &&
                C._maxInstanceCount === void 0 &&
                (C._maxInstanceCount = B.meshPerAttribute * B.count);
            } else for (let H = 0; H < L.locationSize; H++) p(L.location + H);
            n.bindBuffer(n.ARRAY_BUFFER, ct);
            for (let H = 0; H < L.locationSize; H++)
              v(L.location + H, q / L.locationSize, rt, G, q * mt, (q / L.locationSize) * H * mt, nt);
          }
        } else if (P !== void 0) {
          const G = P[F];
          if (G !== void 0)
            switch (G.length) {
              case 2:
                n.vertexAttrib2fv(L.location, G);
                break;
              case 3:
                n.vertexAttrib3fv(L.location, G);
                break;
              case 4:
                n.vertexAttrib4fv(L.location, G);
                break;
              default:
                n.vertexAttrib1fv(L.location, G);
            }
        }
      }
    }
    y();
  }
  function k() {
    b();
    for (const T in s) {
      const E = s[T];
      for (const A in E) {
        const C = E[A];
        for (const R in C) (f(C[R].object), delete C[R]);
        delete E[A];
      }
      delete s[T];
    }
  }
  function M(T) {
    if (s[T.id] === void 0) return;
    const E = s[T.id];
    for (const A in E) {
      const C = E[A];
      for (const R in C) (f(C[R].object), delete C[R]);
      delete E[A];
    }
    delete s[T.id];
  }
  function S(T) {
    for (const E in s) {
      const A = s[E];
      if (A[T.id] === void 0) continue;
      const C = A[T.id];
      for (const R in C) (f(C[R].object), delete C[R]);
      delete A[T.id];
    }
  }
  function b() {
    (w(), (o = !0), a !== i && ((a = i), c(a.object)));
  }
  function w() {
    ((i.geometry = null), (i.program = null), (i.wireframe = !1));
  }
  return {
    setup: r,
    reset: b,
    resetDefaultState: w,
    dispose: k,
    releaseStatesOfGeometry: M,
    releaseStatesOfProgram: S,
    initAttributes: x,
    enableAttribute: p,
    disableUnusedAttributes: y,
  };
}

function rR(n, t, e) {
  let s;
  function i(c) {
    s = c;
  }
  function a(c, f) {
    (n.drawArrays(s, c, f), e.update(f, s, 1));
  }
  function o(c, f, d) {
    d !== 0 && (n.drawArraysInstanced(s, c, f, d), e.update(f, s, d));
  }
  function r(c, f, d) {
    if (d === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s, c, 0, f, 0, d);
    let u = 0;
    for (let m = 0; m < d; m++) u += f[m];
    e.update(u, s, 1);
  }
  function l(c, f, d, h) {
    if (d === 0) return;
    const u = t.get("WEBGL_multi_draw");
    if (u === null) for (let m = 0; m < c.length; m++) o(c[m], f[m], h[m]);
    else {
      u.multiDrawArraysInstancedWEBGL(s, c, 0, f, 0, h, 0, d);
      let m = 0;
      for (let x = 0; x < d; x++) m += f[x] * h[x];
      e.update(m, s, 1);
    }
  }
  ((this.setMode = i),
    (this.render = a),
    (this.renderInstances = o),
    (this.renderMultiDraw = r),
    (this.renderMultiDrawInstances = l));
}

function lR(n, t, e, s) {
  let i;
  function a() {
    if (i !== void 0) return i;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const S = t.get("EXT_texture_filter_anisotropic");
      i = n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else i = 0;
    return i;
  }
  function o(S) {
    return !(S !== Gs && s.convert(S) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function r(S) {
    const b = S === Dr && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(S !== mi && s.convert(S) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) && S !== fo && !b);
  }
  function l(S) {
    if (S === "highp") {
      if (
        n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 &&
        n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0
      )
        return "highp";
      S = "mediump";
    }
    return S === "mediump" &&
      n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 &&
      n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0
      ? "mediump"
      : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const f = l(c);
  f !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", f, "instead."), (c = f));
  const d = e.logarithmicDepthBuffer === !0,
    h = e.reversedDepthBuffer === !0 && t.has("EXT_clip_control"),
    u = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),
    m = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    x = n.getParameter(n.MAX_TEXTURE_SIZE),
    p = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),
    g = n.getParameter(n.MAX_VERTEX_ATTRIBS),
    y = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),
    v = n.getParameter(n.MAX_VARYING_VECTORS),
    _ = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),
    k = m > 0,
    M = n.getParameter(n.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: a,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: r,
    precision: c,
    logarithmicDepthBuffer: d,
    reversedDepthBuffer: h,
    maxTextures: u,
    maxVertexTextures: m,
    maxTextureSize: x,
    maxCubemapSize: p,
    maxAttributes: g,
    maxVertexUniforms: y,
    maxVaryings: v,
    maxFragmentUniforms: _,
    vertexTextures: k,
    maxSamples: M,
  };
}

function cR(n) {
  const t = this;
  let e = null,
    s = 0,
    i = !1,
    a = !1;
  const o = new g0(),
    r = new Je(),
    l = { value: null, needsUpdate: !1 };
  ((this.uniform = l),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (d, h) {
      const u = d.length !== 0 || h || s !== 0 || i;
      return ((i = h), (s = d.length), u);
    }),
    (this.beginShadows = function () {
      ((a = !0), f(null));
    }),
    (this.endShadows = function () {
      a = !1;
    }),
    (this.setGlobalState = function (d, h) {
      e = f(d, h, 0);
    }),
    (this.setState = function (d, h, u) {
      const m = d.clippingPlanes,
        x = d.clipIntersection,
        p = d.clipShadows,
        g = n.get(d);
      if (!i || m === null || m.length === 0 || (a && !p)) a ? f(null) : c();
      else {
        const y = a ? 0 : s,
          v = y * 4;
        let _ = g.clippingState || null;
        ((l.value = _), (_ = f(m, h, v, u)));
        for (let k = 0; k !== v; ++k) _[k] = e[k];
        ((g.clippingState = _), (this.numIntersection = x ? this.numPlanes : 0), (this.numPlanes += y));
      }
    }));
  function c() {
    (l.value !== e && ((l.value = e), (l.needsUpdate = s > 0)), (t.numPlanes = s), (t.numIntersection = 0));
  }
  function f(d, h, u, m) {
    const x = d !== null ? d.length : 0;
    let p = null;
    if (x !== 0) {
      if (((p = l.value), m !== !0 || p === null)) {
        const g = u + x * 4,
          y = h.matrixWorldInverse;
        (r.getNormalMatrix(y), (p === null || p.length < g) && (p = new Float32Array(g)));
        for (let v = 0, _ = u; v !== x; ++v, _ += 4)
          (o.copy(d[v]).applyMatrix4(y, r), o.normal.toArray(p, _), (p[_ + 3] = o.constant));
      }
      ((l.value = p), (l.needsUpdate = !0));
    }
    return ((t.numPlanes = x), (t.numIntersection = 0), p);
  }
}

function fR(n) {
  let t = new WeakMap();
  function e(o, r) {
    return (r === b5 ? (o.mapping = ff) : r === _5 && (o.mapping = df), o);
  }
  function s(o) {
    if (o && o.isTexture) {
      const r = o.mapping;
      if (r === b5 || r === _5)
        if (t.has(o)) {
          const l = t.get(o).texture;
          return e(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new G7(l.height);
            return (
              c.fromEquirectangularTexture(n, o),
              t.set(o, c),
              o.addEventListener("dispose", i),
              e(c.texture, o.mapping)
            );
          } else return null;
        }
    }
    return o;
  }
  function i(o) {
    const r = o.target;
    r.removeEventListener("dispose", i);
    const l = t.get(r);
    l !== void 0 && (t.delete(r), l.dispose());
  }
  function a() {
    t = new WeakMap();
  }
  return { get: s, dispose: a };
}

const $c = 4,
  Iv = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  bl = 20,
  Pg = new ox(),
  Pv = new Ut();

const xl = (1 + Math.sqrt(5)) / 2,
  mc = 1 / xl,
  Dv = [
    new dt(-xl, mc, 0),
    new dt(xl, mc, 0),
    new dt(-mc, 0, xl),
    new dt(mc, 0, xl),
    new dt(0, xl, -mc),
    new dt(0, xl, mc),
    new dt(-1, 1, -1),
    new dt(1, 1, -1),
    new dt(-1, 1, 1),
    new dt(1, 1, 1),
  ],
  dR = new dt();

function hR(n) {
  const t = [],
    e = [],
    s = [];
  let i = n;
  const a = n - $c + 1 + Iv.length;
  for (let o = 0; o < a; o++) {
    const r = Math.pow(2, i);
    e.push(r);
    let l = 1 / r;
    (o > n - $c ? (l = Iv[o - n + $c - 1]) : o === 0 && (l = 0), s.push(l));
    const c = 1 / (r - 2),
      f = -c,
      d = 1 + c,
      h = [f, f, d, f, d, d, f, f, d, d, f, d],
      u = 6,
      m = 6,
      x = 3,
      p = 2,
      g = 1,
      y = new Float32Array(x * m * u),
      v = new Float32Array(p * m * u),
      _ = new Float32Array(g * m * u);
    for (let M = 0; M < u; M++) {
      const S = ((M % 3) * 2) / 3 - 1,
        b = M > 2 ? 0 : -1,
        w = [S, b, 0, S + 2 / 3, b, 0, S + 2 / 3, b + 1, 0, S, b, 0, S + 2 / 3, b + 1, 0, S, b + 1, 0];
      (y.set(w, x * m * M), v.set(h, p * m * M));
      const T = [M, M, M, M, M, M];
      _.set(T, g * m * M);
    }
    const k = new Bn();
    (k.setAttribute("position", new On(y, x)),
      k.setAttribute("uv", new On(v, p)),
      k.setAttribute("faceIndex", new On(_, g)),
      t.push(k),
      i > $c && i--);
  }
  return { lodPlanes: t, sizeLods: e, sigmas: s };
}

function Nv(n, t, e) {
  const s = new go(n, t, e);
  return ((s.texture.mapping = dm), (s.texture.name = "PMREM.cubeUv"), (s.scissorTest = !0), s);
}

function Uu(n, t, e, s, i) {
  (n.viewport.set(t, e, s, i), n.scissor.set(t, e, s, i));
}

function lx() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
export { tn, ee, Io, aR, oR, rR, lR, cR, fR, $c, bl, Pg, Pv, Dv, dR, hR, Nv, Uu, lx };
