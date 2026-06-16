Shaders (*Smash Hit*)
=====================

.. note:: The shaders subsystem was made by yorshex, go complain to them if it
   doesn't work. :3

Example:

.. code:: lua

   knBeginShaders()
   local shader = knGetGameShader("clear")
   local uniform = knGetShaderUniformLocation(shader, "uThirdColor")
   knUseShader(shader)
   knShaderUniform3f(uniform, 0.3, 0.7, 0.65)
   knEndShaders()

``knBeginShaders()``
--------------------

Stores Smash Hit's current shader in internal state

``knEndShaders()``
------------------

Restores Smash Hit's current shader previously saved by
``knBeginShaders()``

``knGetGameShader(name)``
-------------------------

Returns Smash Hit's shader program id by name

``knGetShaderUniformLocation(shader, name)``
--------------------------------------------

Returns a shader program's uniform location by the uniform's name, or
**``nil``** if it doesn't exist

``knUseShader(shader)``
-----------------------

Sets the shader program as current

``knShaderUniform<N><t>(location, v0, [v1, [v2, [v3]]])``
---------------------------------------------------------

See also:
https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glUniform.xml

Sets a float, vec2, vec3, vec4, int, vec2i, vec3i, or vec4i uniform in
the current shader program.

``knShaderUniform<N><t>v(location, t)``
---------------------------------------

Sets a float, vec2, vec3, vec4, int, vec2i, vec3i, or vec4i uniform
array in the current shader program.

The elements are placed linearly inside ``t``, like this:

``{ x0, y0, z0, x1, y1, z1, x2, y2, z2, ..., xn, yn, zn }``

If the last element is unfinished, it is ignored.

``knShaderUniformMatrix<N>fv(location, transpose, t)``
------------------------------------------------------

Sets a mat2, mat3, or mat4 uniform array in the current shader program.

The elements are placed linearly inside ``t``, like this:

``{ x0, y0, z0, x1, y1, z1, x2, y2, z2, ..., xn, yn, zn }``

If the last element is unfinished, it is ignored.

If ``transpose`` is true, the matrices will be transposed before being
assigned to uniforms.
